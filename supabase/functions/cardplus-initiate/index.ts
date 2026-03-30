import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GATEWAY_3D = "https://sanalpos.card-plus.net/fim/est3Dgate";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get("CARDPLUS_CLIENT_ID");
    if (!clientId) throw new Error("CARDPLUS_CLIENT_ID is not configured");

    const storeKey = Deno.env.get("CARDPLUS_STORE_KEY");
    if (!storeKey) throw new Error("CARDPLUS_STORE_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const {
      cardNumber,
      expMonth,
      expYear,
      cvv,
      orderId,
      installment,
      okUrl,
      failUrl,
    } = body;

    if (!cardNumber || !expMonth || !expYear || !cvv || !orderId || !okUrl || !failUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: Look up the order and recalculate total from inventory prices
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("total_amount, status, order_number, items")
      .eq("order_number", orderId)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Sipariş bulunamadı. Lütfen tekrar deneyin." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (order.status !== "pending") {
      return new Response(
        JSON.stringify({ error: "Bu sipariş zaten işlenmiş." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Server-side price recalculation from inventory
    const orderItems = order.items as Array<{ sku?: string; productId?: string; quantity: number; extendedWarranty?: boolean; expressDelivery?: boolean }>;
    let recalculatedTotal = 0;

    if (orderItems && orderItems.length > 0) {
      const skus = orderItems.map(i => i.sku).filter(Boolean);
      if (skus.length > 0) {
        const { data: products } = await supabase
          .from("inventory")
          .select("sku, sale_price, original_price, unit_price")
          .in("sku", skus);

        if (products && products.length > 0) {
          const priceMap = new Map<string, number>();
          for (const p of products) {
            const price = p.sale_price || p.original_price || p.unit_price || 0;
            if (p.sku) priceMap.set(p.sku, Number(price));
          }

          for (const item of orderItems) {
            const price = item.sku ? (priceMap.get(item.sku) || 0) : 0;
            let itemTotal = price * (item.quantity || 1);
            if (item.extendedWarranty) itemTotal += price * 0.10;
            if (item.expressDelivery) itemTotal += 150;
            recalculatedTotal += itemTotal;
          }

          // Allow 1% tolerance for rounding, reject if client total is significantly lower
          if (recalculatedTotal > 0 && order.total_amount < recalculatedTotal * 0.99) {
            console.error(`Price mismatch: DB=${order.total_amount}, calculated=${recalculatedTotal}`);
            // Update order with correct amount
            await supabase.from("orders").update({ total_amount: recalculatedTotal }).eq("order_number", orderId);
          }
        }
      }
    }

    // Use recalculated amount if available, otherwise fall back to DB amount
    const finalAmount = recalculatedTotal > 0 ? recalculatedTotal : order.total_amount;
    const amount = finalAmount.toString();

    const oid = orderId;
    const rnd = Date.now().toString();
    const storetype = "3d";
    const tranType = "Auth";
    const hashAlgorithm = "ver3";
    const currency = "949"; // TRY
    const lang = "tr";
    const billToName = "";
    const billToCompany = "";
    const callbackUrl = failUrl;
    const inst = installment || "";

    // Hash v3: fields sorted alphabetically by key, joined with "|", storeKey appended
    const hashStr = [
      amount,
      billToCompany,
      billToName,
      callbackUrl,
      clientId,
      currency,
      cvv,
      expMonth,
      expYear,
      failUrl,
      hashAlgorithm,
      lang,
      oid,
      okUrl,
      cardNumber,
      rnd,
      storetype,
      storeKey,
    ].join("|");

    // SHA-512 hash, base64 encoded
    const encoder = new TextEncoder();
    const data = encoder.encode(hashStr);
    const hashBuffer = await crypto.subtle.digest("SHA-512", data);
    const hashArray = new Uint8Array(hashBuffer);
    let binary = "";
    for (const byte of hashArray) {
      binary += String.fromCharCode(byte);
    }
    const hash = btoa(binary);

    // Return form data that frontend will auto-submit to bank
    const formData = {
      clientid: clientId,
      amount: amount,
      oid: oid,
      okUrl: okUrl,
      failUrl: failUrl,
      callbackUrl: callbackUrl,
      TranType: tranType,
      Instalment: inst,
      currency: currency,
      rnd: rnd,
      storetype: storetype,
      hashAlgorithm: hashAlgorithm,
      lang: lang,
      pan: cardNumber,
      Ecom_Payment_Card_ExpDate_Month: expMonth,
      Ecom_Payment_Card_ExpDate_Year: expYear,
      cv2: cvv,
      hash: hash,
      BillToName: billToName,
      BillToCompany: billToCompany,
    };

    return new Response(
      JSON.stringify({
        gatewayUrl: GATEWAY_3D,
        formData,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("CardPlus initiate error:", error);
    return new Response(JSON.stringify({ error: "Ödeme başlatılamadı." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

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

    // SECURITY: Look up the order in the database and use the stored total_amount
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("total_amount, status, order_number")
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

    // Use the server-verified amount from the database
    const amount = order.total_amount.toString();

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

    // Build all params that will be sent to gateway
    const allParams: Record<string, string> = {
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
      BillToName: billToName,
      BillToCompany: billToCompany,
    };

    // Hash v3: Sort params alphabetically (case-insensitive), exclude "encoding" and "hash"
    const sortedKeys = Object.keys(allParams).sort((a, b) => 
      a.toUpperCase().localeCompare(b.toUpperCase())
    );

    // Build hash string: param values joined with "|", escape \ and |
    let hashStr = "";
    for (const key of sortedKeys) {
      const lowerKey = key.toLowerCase();
      if (lowerKey !== "encoding" && lowerKey !== "hash") {
        const value = allParams[key].replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
        hashStr += value + "|";
      }
    }
    // Append storeKey at the end (also escaped)
    const escapedStoreKey = storeKey.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
    hashStr += escapedStoreKey;

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
      ...allParams,
      hash: hash,
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

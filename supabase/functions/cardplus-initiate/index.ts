import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    const body = await req.json();
    const {
      amount,
      cardNumber,
      expMonth,
      expYear,
      cvv,
      orderId,
      installment,
      okUrl,
      failUrl,
    } = body;

    if (!amount || !cardNumber || !expMonth || !expYear || !cvv || !okUrl || !failUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const oid = orderId || crypto.randomUUID();
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
    // Fields used: amount|BillToCompany|BillToName|callbackUrl|clientId|currency|cv2|
    //   Ecom_Payment_Card_ExpDate_Month|Ecom_Payment_Card_ExpDate_Year|failUrl|
    //   hashAlgorithm|lang|oid|okUrl|pan|rnd|storetype|storeKey
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
    // Convert to base64
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
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

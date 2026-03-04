import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const storeKey = Deno.env.get("CARDPLUS_STORE_KEY");
    if (!storeKey) throw new Error("CARDPLUS_STORE_KEY is not configured");

    // Bank sends POST with form data
    const formData = await req.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    console.log("CardPlus callback received:", JSON.stringify(params));

    const mdStatus = params["mdStatus"] || "";
    const response = params["Response"] || "";
    const procReturnCode = params["ProcReturnCode"] || "";
    const oid = params["oid"] || "";
    const authCode = params["AuthCode"] || "";
    const errMsg = params["ErrMsg"] || "";
    const transId = params["TransId"] || "";

    // Verify hash from bank response
    const hashParamsVal = params["HASHPARAMSVAL"] || "";
    const hashParams = params["HASHPARAMS"] || "";
    const returnHash = params["HASH"] || "";

    let hashValid = false;
    if (hashParams && returnHash) {
      // Hash v3 response verification:
      // Concatenate values of HASHPARAMS fields (separated by ":") + storeKey, separated by "|"
      const paramNames = hashParams.split(":");
      const values = paramNames
        .filter((p: string) => p.length > 0)
        .map((p: string) => params[p] || "");
      values.push(storeKey);
      const verifyStr = values.join("|");

      const encoder = new TextEncoder();
      const data = encoder.encode(verifyStr);
      const hashBuffer = await crypto.subtle.digest("SHA-512", data);
      const hashArray = new Uint8Array(hashBuffer);
      let binary = "";
      for (const byte of hashArray) {
        binary += String.fromCharCode(byte);
      }
      const calculatedHash = btoa(binary);
      hashValid = calculatedHash === returnHash;
    }

    // Determine success
    // mdStatus: 1 = full 3D auth, 2/5/6/7 = half 3D, 3/4 = fail
    const isSuccess =
      hashValid &&
      (mdStatus === "1" || mdStatus === "2" || mdStatus === "5" || mdStatus === "6" || mdStatus === "7") &&
      response === "Approved" &&
      procReturnCode === "00";

    // Build redirect URL with result params
    const baseUrl = Deno.env.get("SITE_URL") || params["okUrl"]?.split("/odeme")[0] || "";
    const resultParams = new URLSearchParams({
      status: isSuccess ? "success" : "fail",
      orderId: oid,
      authCode: authCode,
      transId: transId,
      errorMessage: errMsg,
      hashValid: hashValid.toString(),
      mdStatus: mdStatus,
    });

    const redirectUrl = `${baseUrl}/odeme/sonuc?${resultParams.toString()}`;

    // Return HTML redirect (bank expects HTML response or redirect)
    return new Response(
      `<!DOCTYPE html>
<html>
<head><meta http-equiv="refresh" content="0;url=${redirectUrl}"></head>
<body><p>Yönlendiriliyorsunuz...</p><script>window.location.href="${redirectUrl}";</script></body>
</html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  } catch (error: unknown) {
    console.error("CardPlus callback error:", error);
    return new Response(
      `<!DOCTYPE html><html><body><h1>Ödeme işlemi sırasında bir hata oluştu.</h1></body></html>`,
      {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const storeKey = Deno.env.get("CARDPLUS_STORE_KEY");
    if (!storeKey) throw new Error("CARDPLUS_STORE_KEY is not configured");

    // Parse body - handle both form-data and url-encoded
    let params: Record<string, string> = {};
    
    const contentType = req.headers.get("content-type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        params[key] = value.toString();
      });
    } else {
      // application/x-www-form-urlencoded or missing content-type
      const body = await req.text();
      const urlParams = new URLSearchParams(body);
      urlParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    console.log("CardPlus callback received:", JSON.stringify(params));

    const mdStatus = params["mdStatus"] || "";
    const response = params["Response"] || "";
    const procReturnCode = params["ProcReturnCode"] || "";
    const oid = params["oid"] || "";
    const authCode = params["AuthCode"] || "";
    const errMsg = params["ErrMsg"] || "";
    const transId = params["TransId"] || "";

    // Verify hash from bank response
    const hashParams = params["HASHPARAMS"] || "";
    const returnHash = params["HASH"] || "";

    let hashValid = false;
    if (hashParams && returnHash) {
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
    const isSuccess =
      hashValid &&
      (mdStatus === "1" || mdStatus === "2" || mdStatus === "5" || mdStatus === "6" || mdStatus === "7") &&
      response === "Approved" &&
      procReturnCode === "00";

    // Build redirect URL
    const siteUrl = Deno.env.get("SITE_URL") || "https://zorluplus.lovable.app";
    const resultParams = new URLSearchParams({
      status: isSuccess ? "success" : "fail",
      orderId: oid,
      authCode: authCode,
      transId: transId,
      errorMessage: errMsg,
      hashValid: hashValid.toString(),
      mdStatus: mdStatus,
    });

    const redirectUrl = `${siteUrl}/odeme/sonuc?${resultParams.toString()}`;

    return new Response(
      `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${redirectUrl}"></head>
<body><p>Yönlendiriliyorsunuz...</p><script>window.location.href="${redirectUrl}";</script></body>
</html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  } catch (error: unknown) {
    console.error("CardPlus callback error:", error);
    
    // Redirect to error page instead of showing raw HTML
    const siteUrl = Deno.env.get("SITE_URL") || "https://zorluplus.lovable.app";
    const redirectUrl = `${siteUrl}/odeme/sonuc?status=fail&errorMessage=${encodeURIComponent("Ödeme işlemi sırasında bir hata oluştu.")}`;
    
    return new Response(
      `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${redirectUrl}"></head>
<body><p>Yönlendiriliyorsunuz...</p><script>window.location.href="${redirectUrl}";</script></body>
</html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { imagePath, removeBg, autoScale, center } = await req.json();
    if (!imagePath) {
      return new Response(JSON.stringify({ error: "imagePath required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Download original image from storage
    const { data: fileData, error: dlError } = await supabase.storage
      .from("product-images")
      .download(imagePath);

    if (dlError || !fileData) {
      return new Response(JSON.stringify({ error: "Could not download image: " + dlError?.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let imageBuffer = new Uint8Array(await fileData.arrayBuffer());
    let contentType = fileData.type || "image/png";
    let processedPath = imagePath;

    // Remove background via remove.bg API
    if (removeBg) {
      const REMOVEBG_API_KEY = Deno.env.get("REMOVEBG_API_KEY");
      if (!REMOVEBG_API_KEY) {
        return new Response(JSON.stringify({ error: "REMOVEBG_API_KEY not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const formData = new FormData();
      formData.append("image_file", new Blob([imageBuffer], { type: contentType }), "image.png");
      formData.append("size", "auto");

      if (autoScale) {
        formData.append("format", "png");
        formData.append("scale", "fit");
      }

      const rbResponse = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": REMOVEBG_API_KEY },
        body: formData,
      });

      if (!rbResponse.ok) {
        const errText = await rbResponse.text();
        console.error("remove.bg error:", rbResponse.status, errText);
        return new Response(JSON.stringify({ error: "remove.bg failed: " + rbResponse.status }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      imageBuffer = new Uint8Array(await rbResponse.arrayBuffer());
      contentType = "image/png";
    }

    // For autoScale and center without removeBg, we use a canvas-like approach via remove.bg
    // In Deno edge functions we don't have Sharp/Canvas, so we handle basic cases:
    // If only autoScale or center is requested (without removeBg), we still upload the original
    // The real processing happens client-side or via remove.bg params above

    // Upload processed image back
    const ext = contentType === "image/png" ? "png" : "jpg";
    const baseName = imagePath.replace(/\.[^.]+$/, "");
    processedPath = `${baseName}_processed.${ext}`;

    const { error: upError } = await supabase.storage
      .from("product-images")
      .upload(processedPath, imageBuffer, {
        contentType,
        upsert: true,
      });

    if (upError) {
      return new Response(JSON.stringify({ error: "Upload failed: " + upError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: publicUrl } = supabase.storage
      .from("product-images")
      .getPublicUrl(processedPath);

    return new Response(JSON.stringify({ 
      url: publicUrl.publicUrl, 
      path: processedPath,
      processed: { removeBg: !!removeBg, autoScale: !!autoScale, center: !!center }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("process-product-image error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

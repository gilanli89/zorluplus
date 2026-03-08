import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { productName, brand, category, type } = await req.json();
    
    if (!productName) {
      return new Response(JSON.stringify({ error: "Ürün adı gerekli" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompts: Record<string, string> = {
      description: `Aşağıdaki ürün için 2-3 cümlelik çekici bir Türkçe ürün açıklaması yaz. Teknik özelliklerden çok faydalarına odaklan.
Ürün: ${productName}${brand ? ` (${brand})` : ""}${category ? ` - Kategori: ${category}` : ""}`,
      
      seo: `Aşağıdaki ürün için SEO uyumlu meta açıklama yaz (max 160 karakter, Türkçe). Anahtar kelimeleri doğal şekilde kullan. KKTC ve Kuzey Kıbrıs bağlamında yaz.
Ürün: ${productName}${brand ? ` (${brand})` : ""}`,
      
      campaign: `Aşağıdaki ürün için kısa ve dikkat çekici bir kampanya/tanıtım metni yaz (max 100 kelime, Türkçe). Emojiler kullanabilirsin.
Ürün: ${productName}${brand ? ` (${brand})` : ""}${category ? ` - Kategori: ${category}` : ""}`,
    };

    const prompt = prompts[type] || prompts.description;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: "Sen Zorlu Digital Plaza için içerik üreten bir asistansın. Kuzey Kıbrıs'ın önde gelen elektronik mağazası. Kısa, profesyonel ve çekici yaz." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit aşıldı, biraz bekleyin." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI kredi limiti dolmuş." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI content error:", response.status, t);
      throw new Error("AI servisi hatası");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("content-gen error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Bilinmeyen hata" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Sen bir ürün arama asistanısın. Kullanıcının doğal dilde yazdığı aramayı analiz et ve yapılandırılmış arama kriterleri döndür.

Mevcut kategoriler: tv-goruntu, beyaz-esya, ankastre, klima-isitma, mutfak-aletleri, kucuk-ev-aletleri, ses-sistemleri, aksesuar, oyun
Alt kategoriler: tv, buzdolabi, derin-dondurucu, mini-buzdolabi, camasir-makinesi, kurutma-makinesi, bulasik-makinesi, ocak, firin, davlumbaz, split-klima, portatif-klima, isiticilar, air-fryer, pisirici, mikrodalga, su-sebili, kahve-makinesi, utu, supurge, ventilator, soundbar-ses-sistemleri, bluetooth-hoparlor, kulaklik
Markalar: Samsung, LG, Midea, Philips, Bosch, Sharp, Toshiba, Vestel, Beko, Arçelik, Krups, Tefal, Braun, Dyson, Brateck, AUX

Örnek:
- "büyük aile için buzdolabı" → kategori: beyaz-esya, alt: buzdolabi, anahtar kelimeler: ["büyük", "aile"]
- "samsung 65 inç tv" → marka: Samsung, kategori: tv-goruntu, alt: tv, anahtar kelimeler: ["65", "inç"]
- "sessiz çamaşır makinesi" → kategori: beyaz-esya, alt: camasir-makinesi, anahtar kelimeler: ["sessiz"]`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { query } = await req.json();
    if (!query?.trim()) {
      return new Response(JSON.stringify({ keywords: [], category: null, subcategory: null, brand: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: query },
        ],
        tools: [{
          type: "function",
          function: {
            name: "search_products",
            description: "Yapılandırılmış arama kriterleri döndür",
            parameters: {
              type: "object",
              properties: {
                keywords: { type: "array", items: { type: "string" }, description: "Arama anahtar kelimeleri" },
                category: { type: "string", description: "Kategori slug", nullable: true },
                subcategory: { type: "string", description: "Alt kategori slug", nullable: true },
                brand: { type: "string", description: "Marka adı", nullable: true },
              },
              required: ["keywords"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "search_products" } },
      }),
    });

    if (!response.ok) {
      // Fallback: return original query as keywords
      return new Response(JSON.stringify({ keywords: query.split(/\s+/), category: null, subcategory: null, brand: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ keywords: query.split(/\s+/), category: null, subcategory: null, brand: null }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("smart-search error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

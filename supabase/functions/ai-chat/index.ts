import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Sen Zorlu Digital Plaza'nın AI asistanısın. Kuzey Kıbrıs'ın önde gelen elektronik ve beyaz eşya mağazasıdır. 
Lefkoşa ve Mağusa'da şubeleri vardır. Samsung ve LG yetkili servisidir.

Görevlerin:
- Müşterilere ürünler hakkında bilgi vermek (TV, beyaz eşya, klima, ankastre, küçük ev aletleri, ses sistemleri)
- Fiyat ve stok bilgisi sormak isteyenleri yönlendirmek
- Servis ve garanti hakkında bilgi vermek (2 yıl garanti, ücretsiz montaj)
- Şube bilgileri: Lefkoşa (0392 223 97 39) ve Mağusa (0548 841 36 36)
- WhatsApp: 0548 878 31 31
- Web: zorluplus.com

Kurallar:
- Türkçe yanıt ver (müşteri İngilizce sorarsa İngilizce)
- Kısa ve yardımcı ol
- Fiyat bilgisi sorarsa "Güncel fiyat için WhatsApp'tan veya mağazamızı arayarak bilgi alabilirsiniz" de
- Rakip markalar hakkında yorum yapma
- Samimi ama profesyonel ol`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Çok fazla istek gönderildi, lütfen biraz bekleyin." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI hizmet kredisi dolmuştur." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI servisi şu anda kullanılamıyor." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Bilinmeyen hata" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1lNCxVunZ1YDxXFOxwYCrl9ToaeIrCW0u/export?format=csv&gid=1509275153";

interface SheetRow {
  sku: string;
  name: string;
  salePrice: number | null;
  regularPrice: number | null;
  inStock: boolean;
  stockQty: number;
  category: string | null;
  imageUrl: string | null;
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(current.trim());
        current = "";
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(current.trim());
        if (row.some((c) => c !== "")) rows.push(row);
        row = [];
        current = "";
      } else {
        current += ch;
      }
    }
  }
  row.push(current.trim());
  if (row.some((c) => c !== "")) rows.push(row);
  return rows;
}

function extractRows(csv: string): SheetRow[] {
  const rows = parseCSV(csv);
  if (rows.length < 2) return [];

  // Header row is first row — find column indices
  const header = rows[0].map((h) => h.toLowerCase());
  const skuIdx = header.findIndex((h) => h.includes("stok kodu") || h.includes("sku"));
  const nameIdx = header.findIndex((h) => h === "i̇sim" || h === "isim" || h === "İsim" || h.includes("sim"));
  const salePriceIdx = header.findIndex((h) => h.includes("indirimli") && h.includes("fiyat"));
  const regularPriceIdx = header.findIndex((h) => h.includes("normal fiyat"));
  const inStockIdx = header.findIndex((h) => h.includes("stokta"));
  const stockQtyIdx = header.findIndex((h) => h === "stok" || (h.includes("stok") && !h.includes("kodu") && !h.includes("stokta") && !h.includes("düşük")));
  const categoryIdx = header.findIndex((h) => h.includes("kategori"));
  const imageIdx = header.findIndex((h) => h.includes("görsel"));

  const results: SheetRow[] = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const sku = skuIdx >= 0 ? r[skuIdx] : "";
    if (!sku) continue;

    const regularPrice = regularPriceIdx >= 0 ? parseFloat(r[regularPriceIdx]) : NaN;
    const salePrice = salePriceIdx >= 0 ? parseFloat(r[salePriceIdx]) : NaN;

    results.push({
      sku,
      name: nameIdx >= 0 ? r[nameIdx] || "" : "",
      regularPrice: isNaN(regularPrice) ? null : regularPrice,
      salePrice: isNaN(salePrice) || salePrice === 0 ? null : salePrice,
      inStock: inStockIdx >= 0 ? r[inStockIdx] === "1" : true,
      stockQty: stockQtyIdx >= 0 ? parseInt(r[stockQtyIdx]) || 0 : 1,
      category: categoryIdx >= 0 ? r[categoryIdx] || null : null,
      imageUrl: imageIdx >= 0 ? r[imageIdx] || null : null,
    });
  }

  return results;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Fetch CSV from Google Sheets
    const resp = await fetch(SHEET_CSV_URL);
    if (!resp.ok) {
      throw new Error(`Google Sheets fetch failed: ${resp.status}`);
    }
    const csvText = await resp.text();
    const rows = extractRows(csvText);

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "No rows found in sheet" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let synced = 0;
    let errors = 0;

    // Upsert each row
    for (const row of rows) {
      const { error } = await supabase.from("inventory").upsert(
        {
          sku: row.sku,
          product_name: row.name,
          original_price: row.regularPrice,
          sale_price: row.salePrice,
          is_active: row.inStock,
          quantity: row.stockQty,
          category: row.category,
          image_url: row.imageUrl,
          price_updated_at: new Date().toISOString(),
        },
        { onConflict: "sku" }
      );
      if (error) {
        console.error(`Error upserting SKU ${row.sku}:`, error.message);
        errors++;
      } else {
        synced++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        total: rows.length,
        synced,
        errors,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Sync error:", message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

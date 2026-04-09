

## Priority-Based Product Data Merging

**Current behavior**: CSV is the base, and the database only overrides price, sale price, stock quantity, and active status. Other fields (name, brand, description, specs/attributes, images, category) always come from CSV.

**Requested behavior**: Database (manual edits) takes priority for ALL fields, CSV fills in gaps, everything else is lowest priority.

---

### Plan

#### Step 1: Expand `inventory_public` view to include all editable fields

Update the view to also expose `product_name`, `brand`, `category`, `description`, `attributes`, and `image_url` — fields that admins can edit manually. Currently the view only exposes price/stock fields.

**Migration**: Drop and recreate `inventory_public` with additional columns, re-grant SELECT to anon/authenticated.

#### Step 2: Update `useProducts` merge logic

Rewrite `fetchProductsWithInventory` to:

1. Fetch CSV products and DB inventory in parallel (same as now)
2. For products found in **both** DB and CSV: DB values take priority for every non-null field (name, brand, category, description, image, price, salePrice, specs/attributes, stock)
3. For products found **only in DB**: construct a full Product object from DB data alone (so manually-added products appear on the site)
4. For products found **only in CSV**: use CSV values as-is (current behavior)
5. Filter out `is_active = false` products

This means admin edits (name changes, description updates, attribute additions) will immediately reflect on the frontend without needing to update the CSV.

#### Step 3: Merge attributes into specs

Map the JSONB `attributes` column from the inventory table into the Product's `specs` field, overriding any CSV-sourced specs when DB attributes exist.

---

### Technical Details

**Files to modify:**
- New migration: Recreate `inventory_public` view with `product_name, brand, category, description, attributes, image_url`
- `src/hooks/useProducts.ts`: Rewrite merge logic with DB-first priority; support DB-only products
- `src/lib/products.ts`: Add helper to generate slug from SKU+name for DB-only products

**Data flow after change:**
```text
DB (inventory)  →  highest priority (manual edits)
CSV (products.csv) →  fallback for missing fields
```




## Problem Analysis

Two issues reported:

### 1. Save operation hangs (never completes)
The Add/Edit Product dialogs call `supabase.from("inventory").insert/update(...)` directly. The `inventory` table RLS policy requires `is_admin(auth.jwt() ->> 'email')`. If the admin's auth session silently expires or the JWT token becomes stale, the Supabase request will hang indefinitely without returning an error. The code has no timeout mechanism.

### 2. Chrome vs Firefox show different prices
The `useProducts` hook merges CSV prices with `inventory_public` view data. The network logs show `inventory_public` returning `[]` (empty array) from the frontend -- but the DB actually has 235 rows. This means the anon key request is failing silently (likely RLS or view permission issue). When `inventory_public` returns empty, the frontend falls back to CSV-only prices. Different browsers cache the CSV (`/data/products.csv`) differently, so stale cached CSV data causes price discrepancies.

Additionally, 97 of 235 inventory items have `quantity = 0`, meaning they'd show as "out of stock" even though you previously requested all products be in stock.

---

## Plan

### Step 1: Fix save hanging with timeout and auth refresh
- Before each save operation, call `supabase.auth.getSession()` to refresh the token
- Add a timeout wrapper (e.g. 15 seconds) around the insert/update calls with `AbortController` or `Promise.race`
- Show a clear error toast if the operation times out instead of hanging indefinitely

### Step 2: Fix price inconsistency - ensure inventory_public returns data
- Check if `inventory_public` view has proper anon/public SELECT permissions
- If the view is missing RLS or grant, add a migration to grant `SELECT` on `inventory_public` to `anon` and `authenticated` roles
- This will ensure all browsers get the same DB prices instead of falling back to cached CSV

### Step 3: Fix remaining out-of-stock items
- Run a migration to set `quantity = GREATEST(quantity, 1)` for all rows with `quantity = 0` in the inventory table

### Step 4: Add cache-busting for CSV
- Append a timestamp query parameter to the CSV fetch URL to prevent browser caching from causing stale prices

---

### Technical Details

**Files to modify:**
- `src/pages/admin/AdminInventory.tsx` -- Add auth refresh + timeout to `handleSave` in both AddProductDialog and EditProductDialog
- `src/hooks/useProducts.ts` -- Add cache-busting parameter to CSV fetch
- `src/lib/products.ts` -- Append `?t=timestamp` to CSV URL
- New migration -- Fix `inventory_public` view permissions + reset zero-quantity rows


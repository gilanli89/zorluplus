export interface Product {
  id: string;
  sku: string;
  model?: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  salePrice?: number;
  currency: string;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

export interface CategoryNode {
  slug: string;
  name: string;
  icon?: string;
  children: { slug: string; name: string }[];
}

export interface FilterState {
  brands: string[];
  priceMin?: number;
  priceMax?: number;
  inStock: boolean;
  attributes: Record<string, string[]>;
  sort: SortOption;
}

export type SortOption =
  | "popular"
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "sale";

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbed: string;
  mapsLink: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  productId?: string;
  productSku?: string;
  productName?: string;
  productUrl?: string;
  productPrice?: number;
  branch: string;
  notes: string;
}

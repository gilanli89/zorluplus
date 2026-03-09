import { useQuery } from "@tanstack/react-query";

const WP_BASE = "https://cms.zorluplus.com/wp-json/wp/v2";

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    "wp:term"?: { id: number; name: string; slug: string }[][];
  };
}

export interface WPPage {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

async function fetchAllPaginated<T>(endpoint: string, params = ""): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const sep = params ? "&" : "?";
    const url = `${WP_BASE}/${endpoint}?per_page=100&_embed${params ? sep + params : ""}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) break;
    totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    const data = await res.json();
    all.push(...data);
    page++;
  }
  return all;
}

export function useWPPosts() {
  return useQuery({
    queryKey: ["wp-posts"],
    queryFn: () => fetchAllPaginated<WPPost>("posts"),
    staleTime: 5 * 60 * 1000,
  });
}

export function useWPPages() {
  return useQuery({
    queryKey: ["wp-pages"],
    queryFn: () => fetchAllPaginated<WPPage>("pages"),
    staleTime: 5 * 60 * 1000,
  });
}

export function useWPCategories() {
  return useQuery({
    queryKey: ["wp-categories"],
    queryFn: () => fetchAllPaginated<WPCategory>("categories"),
    staleTime: 10 * 60 * 1000,
  });
}

export function useWPPostBySlug(slug: string) {
  return useQuery({
    queryKey: ["wp-post", slug],
    queryFn: async () => {
      const res = await fetch(`${WP_BASE}/posts?slug=${slug}&_embed`);
      if (!res.ok) throw new Error("Post not found");
      const data: WPPost[] = await res.json();
      if (!data.length) throw new Error("Post not found");
      return data[0];
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useWPPageBySlug(slug: string) {
  return useQuery({
    queryKey: ["wp-page", slug],
    queryFn: async () => {
      const res = await fetch(`${WP_BASE}/pages?slug=${slug}&_embed`);
      if (!res.ok) throw new Error("Page not found");
      const data: WPPage[] = await res.json();
      if (!data.length) throw new Error("Page not found");
      return data[0];
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

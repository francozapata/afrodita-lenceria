import { supabase } from "./supabase";
import type { Product } from "./types";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*), product_images(*), product_variants(*)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data || []) as Product[];
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*), product_images(*), product_variants(*)")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Product;
}

export function totalStock(product: Product) {
  return product.product_variants?.reduce((sum, item) => sum + Number(item.stock || 0), 0) || 0;
}

export function productImage(product: Product) {
  return product.product_images?.sort((a,b)=>Number(b.is_primary)-Number(a.is_primary) || a.sort_order-b.sort_order)?.[0]?.image_url || "/afrodita-logo.jpg";
}

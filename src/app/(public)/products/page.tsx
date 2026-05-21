import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import ProductCatalog from "./ProductCatalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Hanney-V's collection of luxury fashion items. Bespoke suits, traditional wear, and bridal couture available for order.",
};

export const revalidate = 60;

export default async function ProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  const items = (products as Product[] | null) || [];

  // Extract unique categories
  const categories = Array.from(new Set(items.map((p) => p.category))).filter(Boolean);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
            <span className="block w-2 h-2 rotate-45 bg-gold-400" aria-hidden="true" />
            <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-950 mb-4">
            Our Collection
          </h1>
          <div className="w-16 h-0.5 bg-gold-gradient mx-auto mb-4" />
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Explore our curated selection of luxury fashion pieces
          </p>
        </div>

        <ProductCatalog products={items} categories={categories} />
      </div>
    </div>
  );
}

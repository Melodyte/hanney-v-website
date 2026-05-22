import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { generateProductJsonLd } from "@/lib/utils/jsonld";
import type { Product } from "@/lib/types";
import ProductDetail from "./ProductDetail";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      title: "Product",
      description: "Hanney-V luxury fashion product",
    };
  }

  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, description, price_naira")
    .eq("id", id)
    .eq("is_visible", true)
    .single();

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description?.slice(0, 160) || `${product.name} - Hanney-V luxury fashion.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-3xl md:text-4xl text-neutral-950 mb-4">
              Database Not Configured
            </h1>
            <p className="text-neutral-600 mb-6">
              Supabase environment variables are not configured. Please set up your Supabase project.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .single();

  if (!product) {
    notFound();
  }

  const item = product as Product;
  const productJsonLd = generateProductJsonLd(item);

  return (
    <div className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-gold-600 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <ProductDetail product={item} />
      </div>
    </div>
  );
}

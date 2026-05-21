import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { PortfolioItem } from "@/lib/types";
import PortfolioGallery from "./PortfolioGallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Hanney-V's portfolio of bespoke menswear, bridal couture, traditional wear, and event styling creations.",
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const supabase = await createClient();

  const { data: portfolioItems } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("sort_order", { ascending: true });

  const items = (portfolioItems as PortfolioItem[] | null) || [];

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
            Our Portfolio
          </h1>
          <div className="w-16 h-0.5 bg-gold-gradient mx-auto mb-4" />
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            A showcase of our finest creations across bespoke, bridal, traditional, and event styling
          </p>
        </div>

        <PortfolioGallery items={items} />
      </div>
    </div>
  );
}

"use client";

export interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  allLabel?: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  allLabel = "All",
}: CategoryFilterProps) {
  const allCategories = [allLabel, ...categories];

  return (
    <div
      className="flex flex-wrap gap-2 justify-center"
      role="group"
      aria-label="Category filter"
    >
      {allCategories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 ${
              isActive
                ? "bg-gold-gradient text-neutral-950 shadow-gold"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
            }`}
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Best Discount" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("relevance");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1200]);
  const [minRating, setMinRating] = useState(0);

  const searchQuery = searchParams.get("search") || "";

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category.toLowerCase().replace(/ & /g, "-") === selectedCategory);
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    switch (sort) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "discount": result.sort((a, b) => b.discount - a.discount); break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, minRating, sort]);

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 1200]);
    setMinRating(0);
    setSort("relevance");
    setSearchParams({});
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer text-foreground hover:text-primary transition">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.slug}
                onChange={() => setSelectedCategory(cat.slug)}
                className="accent-primary"
              />
              {cat.icon} {cat.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">${priceRange[0]}</span>
          <input
            type="range"
            min={0}
            max={1200}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="flex-1 accent-primary"
          />
          <span className="text-muted-foreground">${priceRange[1]}</span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm cursor-pointer text-foreground">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-primary" />
              {r}★ & above
            </label>
          ))}
        </div>
      </div>
      <button onClick={clearFilters} className="text-sm text-primary hover:underline">Clear All Filters</button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground"
          >
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden p-2 border border-border rounded-lg">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop filters */}
        <aside className="hidden md:block w-60 shrink-0">
          <div className="bg-card rounded-xl border border-border p-5 sticky top-28">
            <h2 className="font-bold text-foreground mb-4">Filters</h2>
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile filters */}
        {showFilters && (
          <div className="fixed inset-0 bg-foreground/50 z-50 md:hidden" onClick={() => setShowFilters(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-card p-6 overflow-y-auto animate-slide-in" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-foreground">Filters</h2>
                <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">😕</p>
              <p className="text-lg font-medium text-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="btn-primary-cta mt-4 text-sm">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

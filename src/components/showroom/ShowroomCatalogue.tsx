"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import ShowroomCard from "@/components/showroom/ShowroomCard";
import {
  businessTypes,
  showroomFeatures,
  showroomProducts,
  websiteTypes,
} from "@/data/showroom";
import { trackShowroomEvent } from "@/lib/showroom-events";

type SortOption = "recommended" | "newest" | "price-low" | "price-high" | "fastest";

const initialFilters = {
  business: "All",
  websiteType: "All",
  budget: "All",
  delivery: "Any",
  features: [] as string[],
};

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function ShowroomCatalogue() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    trackShowroomEvent("showroom_view", { totalProducts: showroomProducts.length });
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = normalize(deferredQuery.trim());
    const filtered = showroomProducts.filter((product) => {
      const searchable = normalize([
        product.name,
        product.description,
        ...product.category,
        ...product.websiteType,
        ...product.tags,
        ...product.features,
      ].join(" "));

      if (normalizedQuery && !searchable.includes(normalizedQuery)) return false;
      if (filters.business !== "All" && !product.category.includes(filters.business as never)) return false;
      if (filters.websiteType !== "All" && !product.websiteType.includes(filters.websiteType as never)) return false;
      if (filters.features.length && !filters.features.every((feature) => product.features.includes(feature as never))) return false;

      if (filters.budget === "under-10" && product.startingPrice >= 10000) return false;
      if (filters.budget === "10-15" && (product.startingPrice < 10000 || product.startingPrice > 15000)) return false;
      if (filters.budget === "15-25" && (product.startingPrice < 15000 || product.startingPrice > 25000)) return false;
      if (filters.budget === "25-plus" && product.startingPrice < 25000) return false;

      if (filters.delivery !== "Any" && product.deliveryDays.max > Number(filters.delivery)) return false;
      return true;
    });

    return [...filtered].sort((left, right) => {
      if (sort === "newest") return Date.parse(right.publishedAt) - Date.parse(left.publishedAt);
      if (sort === "price-low") return left.startingPrice - right.startingPrice;
      if (sort === "price-high") return right.startingPrice - left.startingPrice;
      if (sort === "fastest") return left.deliveryDays.max - right.deliveryDays.max || left.deliveryDays.min - right.deliveryDays.min;
      return Number(right.featured) - Number(left.featured) || left.sortOrder - right.sortOrder;
    });
  }, [deferredQuery, filters, sort]);

  const activeFilterCount = [
    filters.business !== "All",
    filters.websiteType !== "All",
    filters.budget !== "All",
    filters.delivery !== "Any",
    ...filters.features.map(() => true),
  ].filter(Boolean).length;

  const updateFilter = (key: keyof typeof initialFilters, value: string | string[]) => {
    setFilters((current) => ({ ...current, [key]: value }));
    trackShowroomEvent("showroom_filter", { filter: key, value });
  };

  const toggleFeature = (feature: string) => {
    const features = filters.features.includes(feature)
      ? filters.features.filter((item) => item !== feature)
      : [...filters.features, feature];
    updateFilter("features", features);
  };

  const clearFilters = () => {
    setQuery("");
    setFilters(initialFilters);
    setSort("recommended");
  };

  return (
    <section id="catalogue" className="mx-auto w-full max-w-7xl px-4 pb-32 md:px-10">
      <div className="sticky top-4 z-30 mb-10 rounded-2xl border border-white/10 bg-background/90 p-3 shadow-2xl backdrop-blur-xl md:top-6 md:p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search showroom designs</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                trackShowroomEvent("showroom_search", { query: event.target.value });
              }}
              placeholder="Search cafés, booking, galleries..."
              className="h-12 w-full rounded-lg border border-white/10 bg-white/5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-foreground/35 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"
            />
          </label>

          <div className="hidden items-center gap-2 md:flex">
            <FilterSelect label="Business" value={filters.business} onChange={(value) => updateFilter("business", value)} options={["All", ...businessTypes]} />
            <FilterSelect label="Website type" value={filters.websiteType} onChange={(value) => updateFilter("websiteType", value)} options={["All", ...websiteTypes]} />
            <FilterSelect label="Budget" value={filters.budget} onChange={(value) => updateFilter("budget", value)} options={["All", "under-10", "10-15", "15-25", "25-plus"]} labels={{ "under-10": "Under ₹10K", "10-15": "₹10K–₹15K", "15-25": "₹15K–₹25K", "25-plus": "₹25K+" }} />
            <FilterSelect label="Delivery" value={filters.delivery} onChange={(value) => updateFilter("delivery", value)} options={["Any", "7", "14", "21"]} labels={{ "7": "≤ 7 days", "14": "≤ 14 days", "21": "≤ 21 days" }} />
            <details className="group relative">
              <summary className="flex h-12 cursor-pointer list-none items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-foreground/75 outline-none transition-colors hover:border-white/20 focus-visible:ring-2 focus-visible:ring-primary">
                Features {filters.features.length ? `(${filters.features.length})` : ""}
              </summary>
              <div className="absolute right-0 top-14 w-56 rounded-xl border border-white/10 bg-[#0b0b0b] p-3 shadow-2xl">
                <FeatureOptions selected={filters.features} onToggle={toggleFeature} />
              </div>
            </details>
          </div>

          <div className="flex gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Filter className="h-4 w-4" /> Filters {activeFilterCount ? `(${activeFilterCount})` : ""}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-foreground/55" aria-live="polite">
          Showing <span className="font-semibold text-foreground">{results.length}</span> of {showroomProducts.length} designs
        </p>
        <label className="flex items-center gap-3 text-sm text-foreground/50">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Sort</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-10 rounded-lg border border-white/10 bg-[#0b0b0b] px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="fastest">Fastest Delivery</option>
          </select>
        </label>
      </div>

      {results.length ? (
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((product, index) => <ShowroomCard key={product.id} product={product} priority={index < 3} />)}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 text-center">
          <Search className="mb-5 h-8 w-8 text-foreground/30" />
          <h2 className="text-2xl font-bold">No designs match your filters.</h2>
          <p className="mt-2 text-foreground/50">Try a broader category, budget, or feature selection.</p>
          <button type="button" onClick={clearFilters} className="mt-6 min-h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Clear filters
          </button>
        </div>
      )}

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div className="fixed inset-0 z-[90] flex items-end bg-black/75 backdrop-blur-sm md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.currentTarget === event.target && setMobileFiltersOpen(false)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="max-h-[88vh] w-full overflow-y-auto rounded-t-2xl border-t border-white/10 bg-[#090909] p-5 pb-24">
              <div className="mb-6 flex items-center justify-between">
                <h2 id="mobile-filter-title" className="text-xl font-bold">Filter designs</h2>
                <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters" className="rounded-full border border-white/10 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-5">
                <FilterSelect label="Business type" value={filters.business} onChange={(value) => updateFilter("business", value)} options={["All", ...businessTypes]} expanded />
                <FilterSelect label="Website type" value={filters.websiteType} onChange={(value) => updateFilter("websiteType", value)} options={["All", ...websiteTypes]} expanded />
                <FilterSelect label="Budget" value={filters.budget} onChange={(value) => updateFilter("budget", value)} options={["All", "under-10", "10-15", "15-25", "25-plus"]} labels={{ "under-10": "Under ₹10K", "10-15": "₹10K–₹15K", "15-25": "₹15K–₹25K", "25-plus": "₹25K+" }} expanded />
                <FilterSelect label="Delivery" value={filters.delivery} onChange={(value) => updateFilter("delivery", value)} options={["Any", "7", "14", "21"]} labels={{ "7": "≤ 7 days", "14": "≤ 14 days", "21": "≤ 21 days" }} expanded />
                <fieldset>
                  <legend className="mb-3 text-xs uppercase tracking-wider text-foreground/50">Features</legend>
                  <div className="grid grid-cols-2 gap-2"><FeatureOptions selected={filters.features} onToggle={toggleFeature} /></div>
                </fieldset>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <button type="button" onClick={clearFilters} className="min-h-12 rounded-full border border-white/15 text-sm font-medium">Clear all</button>
                <button type="button" onClick={() => setMobileFiltersOpen(false)} className="min-h-12 rounded-full bg-foreground text-sm font-medium text-background">Show {results.length} designs</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FilterSelect({ label, value, options, labels = {}, onChange, expanded = false }: { label: string; value: string; options: readonly string[]; labels?: Record<string, string>; onChange: (value: string) => void; expanded?: boolean }) {
  return (
    <label className={expanded ? "block" : "sr-only md:not-sr-only"}>
      <span className={expanded ? "mb-2 block text-xs uppercase tracking-wider text-foreground/50" : "sr-only"}>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} className={`${expanded ? "w-full" : "max-w-40"} h-12 rounded-lg border border-white/10 bg-[#0b0b0b] px-3 text-sm text-foreground/75 outline-none focus-visible:ring-2 focus-visible:ring-primary`}>
        {options.map((option) => {
          const fallbackLabel = option === "All" || option === "Any"
            ? (expanded ? option : `${label}: ${option}`)
            : option;
          return <option key={option} value={option}>{labels[option] ?? fallbackLabel}</option>;
        })}
      </select>
    </label>
  );
}

function FeatureOptions({ selected, onToggle }: { selected: string[]; onToggle: (feature: string) => void }) {
  return showroomFeatures.map((feature) => (
    <label key={feature} className="flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm text-foreground/70 transition-colors hover:bg-white/5">
      <input type="checkbox" checked={selected.includes(feature)} onChange={() => onToggle(feature)} className="h-4 w-4 accent-primary" />
      {feature}
    </label>
  ));
}
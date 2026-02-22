import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ShopToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  maxPrice: number;
  onPriceChange: (value: number) => void;
  sortBy: "featured" | "priceLow" | "priceHigh" | "newest";
  onSortChange: (
    value: "featured" | "priceLow" | "priceHigh" | "newest",
  ) => void;
  onClearFilters: () => void;
}

const ShopToolbar = ({
  searchQuery,
  onSearchChange,
  maxPrice,
  onPriceChange,
  sortBy,
  onSortChange,
  onClearFilters,
}: ShopToolbarProps) => {
  const { t } = useTranslation();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const renderFilterControls = (idPrefix: string) => (
    <>
      <div className="grid gap-1.5">
        <label
          className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          htmlFor={`${idPrefix}-product-search`}
        >
          {t("shop.searchLabel")}
        </label>
        <div className="flex h-11 items-center gap-2 rounded-md border border-border bg-surface-1 px-3 shadow-soft transition duration-180 focus-within:border-brand/70 focus-within:ring-2 focus-within:ring-brand/40">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            aria-label={t("shop.searchInputAria")}
            className="h-full w-full border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            id={`${idPrefix}-product-search`}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t("shop.searchPlaceholder")}
            type="search"
            value={searchQuery}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <label
            className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
            htmlFor={`${idPrefix}-max-price-slider`}
          >
            {t("shop.maxPriceLabel")}
          </label>
          <span className="text-sm font-semibold text-foreground">
            ${maxPrice}
          </span>
        </div>
        <Slider
          id={`${idPrefix}-max-price-slider`}
          max={10000}
          min={50}
          onValueChange={(values) => onPriceChange(values[0] ?? 10000)}
          step={50}
          value={[maxPrice]}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$50</span>
          <span>$10,000</span>
        </div>
      </div>

      <div className="grid gap-1.5">
        <label
          className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          htmlFor={`${idPrefix}-sort-products`}
        >
          {t("shop.sortBy")}
        </label>
        <select
          aria-label={t("shop.sortBy")}
          className="h-11 rounded-md border border-border bg-surface-1 px-3 text-sm font-medium text-foreground shadow-soft transition duration-180 focus-visible:border-brand/70 focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-0"
          id={`${idPrefix}-sort-products`}
          onChange={(event) =>
            onSortChange(event.target.value as typeof sortBy)
          }
          value={sortBy}
        >
          <option value="featured">{t("shop.sortFeatured")}</option>
          <option value="newest">{t("shop.sortNewest")}</option>
          <option value="priceLow">{t("shop.sortPriceLow")}</option>
          <option value="priceHigh">{t("shop.sortPriceHigh")}</option>
        </select>
      </div>

      <div className="flex items-end">
        <Button onClick={onClearFilters} variant="secondary">
          {t("shop.clearFilters")}
        </Button>
      </div>
    </>
  );

  return (
    <section className="space-y-3 rounded-lg border border-border bg-surface-1 p-4 shadow-soft sm:p-5">
      <div className="flex items-center justify-between md:hidden">
        <p className="text-sm font-semibold text-foreground">
          {t("shop.filters")}
        </p>
        <Drawer onOpenChange={setIsFiltersOpen} open={isFiltersOpen}>
          <DrawerTrigger asChild>
            <Button size="sm" variant="secondary">
              <SlidersHorizontal className="h-4 w-4" />
              {t("shop.openFilters")}
            </Button>
          </DrawerTrigger>
          <DrawerContent side="bottom">
            <DrawerHeader>
              <DrawerTitle>{t("shop.filters")}</DrawerTitle>
            </DrawerHeader>
            <div className="mt-2 grid gap-4">
              {renderFilterControls("mobile")}
            </div>
            <Button
              className="mt-4"
              onClick={() => setIsFiltersOpen(false)}
              variant="primary"
            >
              {t("shop.applyFilters")}
            </Button>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-[minmax(14rem,1.2fr)_minmax(13rem,1fr)_minmax(10rem,0.8fr)_auto] md:items-end">
        {renderFilterControls("desktop")}
      </div>
    </section>
  );
};

export default ShopToolbar;

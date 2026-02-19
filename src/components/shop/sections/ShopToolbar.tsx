import { Slider } from "@/components/ui/slider";
import { useTranslation } from "react-i18next";
import {
  container,
  fieldGroup,
  input,
  label,
  priceGroup,
  priceLabel,
  sliderWrap,
} from "./ShopToolbar.styles";

interface ShopToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  maxPrice: number;
  onPriceChange: (value: number) => void;
}

const ShopToolbar = ({
  searchQuery,
  onSearchChange,
  maxPrice,
  onPriceChange,
}: ShopToolbarProps) => {
  const { t } = useTranslation();

  return (
    <section className={container()}>
      <div className={fieldGroup()}>
        <label className={label()} htmlFor="product-search">
          {t("shop.searchLabel")}
        </label>
        <input
          aria-label={t("shop.searchInputAria")}
          className={input()}
          id="product-search"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("shop.searchPlaceholder")}
          type="text"
          value={searchQuery}
        />
      </div>

      <div className={fieldGroup()}>
        <div className={priceGroup()}>
          <span className={priceLabel()}>
            {t("shop.maxPrice", { value: maxPrice })}
          </span>
        </div>
        <div className={sliderWrap()}>
          <Slider
            defaultValue={[maxPrice]}
            max={10000}
            min={1}
            onValueChange={(values) => onPriceChange(values[0] ?? 10000)}
            step={50}
            value={[maxPrice]}
          />
        </div>
      </div>
    </section>
  );
};

export default ShopToolbar;

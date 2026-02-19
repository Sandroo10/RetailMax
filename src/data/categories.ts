import {
  categoryBeautyImage,
  categoryClothingImage,
  categoryElectronicsImage,
  categoryGymImage,
  categoryToysImage,
} from "@/assets";

export interface CategoryDefinition {
  label: string;
  slug: string;
  databaseValue: string;
  image: string;
  shortDescription: string;
}

export const categoryDefinitions: CategoryDefinition[] = [
  {
    label: "Electronics",
    slug: "electronics",
    databaseValue: "electronics",
    image: categoryElectronicsImage,
    shortDescription: "Devices and accessories for home and office.",
  },
  {
    label: "Clothing",
    slug: "clothing",
    databaseValue: "clothing",
    image: categoryClothingImage,
    shortDescription: "Everyday essentials and seasonal collections.",
  },
  {
    label: "Gym Equipment",
    slug: "gym-equipment",
    databaseValue: "gym equipment",
    image: categoryGymImage,
    shortDescription: "Strength, cardio, and recovery tools.",
  },
  {
    label: "Toys",
    slug: "toys",
    databaseValue: "toys",
    image: categoryToysImage,
    shortDescription: "Playful picks for all ages.",
  },
  {
    label: "Beauty Products",
    slug: "beauty-products",
    databaseValue: "beauty products",
    image: categoryBeautyImage,
    shortDescription: "Skincare, wellness, and beauty staples.",
  },
];

export const categoryBySlug = categoryDefinitions.reduce(
  (accumulator, category) => {
    accumulator[category.slug] = category;
    return accumulator;
  },
  {} as Record<string, CategoryDefinition>,
);

export const categorySlugFromDbValue = (dbValue: string) => {
  const normalized = dbValue.trim().toLowerCase();

  const match = categoryDefinitions.find(
    (category) => category.databaseValue === normalized,
  );

  return match?.slug ?? normalized.replace(/\s+/g, "-");
};

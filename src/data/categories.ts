import {
  categoryBeautyImage,
  categoryClothingImage,
  categoryElectronicsImage,
  categoryGymImage,
  categoryToysImage,
} from "@/assets";

export interface CategoryDefinition {
  labelKey: string;
  slug: string;
  databaseValue: string;
  image: string;
  shortDescriptionKey: string;
}

export const categoryDefinitions: CategoryDefinition[] = [
  {
    labelKey: "categories.electronics",
    slug: "electronics",
    databaseValue: "electronics",
    image: categoryElectronicsImage,
    shortDescriptionKey: "categoriesDescriptions.electronics",
  },
  {
    labelKey: "categories.clothing",
    slug: "clothing",
    databaseValue: "clothing",
    image: categoryClothingImage,
    shortDescriptionKey: "categoriesDescriptions.clothing",
  },
  {
    labelKey: "categories.gymEquipment",
    slug: "gym-equipment",
    databaseValue: "gym equipment",
    image: categoryGymImage,
    shortDescriptionKey: "categoriesDescriptions.gymEquipment",
  },
  {
    labelKey: "categories.toys",
    slug: "toys",
    databaseValue: "toys",
    image: categoryToysImage,
    shortDescriptionKey: "categoriesDescriptions.toys",
  },
  {
    labelKey: "categories.beautyProducts",
    slug: "beauty-products",
    databaseValue: "beauty products",
    image: categoryBeautyImage,
    shortDescriptionKey: "categoriesDescriptions.beautyProducts",
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

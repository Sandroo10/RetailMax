interface LocalizableProductFields {
  name?: string | null;
  name_ge?: string | null;
  description?: string | null;
  description_ge?: string | null;
}

const normalizeText = (value?: string | null) => value?.trim() ?? "";

export const isGeorgianLanguage = (language?: string) => {
  const normalizedLanguage = language?.toLowerCase().trim() ?? "en";

  return (
    normalizedLanguage === "ka" ||
    normalizedLanguage.startsWith("ka-") ||
    normalizedLanguage === "ge" ||
    normalizedLanguage.startsWith("ge-")
  );
};

export const getLocalizedProductName = (
  product: LocalizableProductFields,
  language?: string,
) => {
  if (isGeorgianLanguage(language)) {
    return normalizeText(product.name_ge) || normalizeText(product.name);
  }

  return normalizeText(product.name) || normalizeText(product.name_ge);
};

export const getLocalizedProductDescription = (
  product: LocalizableProductFields,
  language?: string,
) => {
  if (isGeorgianLanguage(language)) {
    return (
      normalizeText(product.description_ge) || normalizeText(product.description)
    );
  }

  return (
    normalizeText(product.description) || normalizeText(product.description_ge)
  );
};

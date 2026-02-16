import "server-only";

const dictionaries = {
  en: {
    common: () =>
      import("../locales/en/common.json").then((module) => module.default),
    product: () =>
      import("../locales/en/product.json").then((module) => module.default),
  },
  mm: {
    common: () =>
      import("../locales/mm/common.json").then((module) => module.default),
    product: () =>
      import("../locales/mm/product.json").then((module) => module.default),
  },
};

export const getDictionary = async (
  locale: "en" | "mm",
  namespace: "common" | "product",
) => dictionaries[locale][namespace]() as Promise<any>;

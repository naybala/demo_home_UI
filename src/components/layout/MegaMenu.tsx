"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductsAPI } from "@/features/products/api/products.api";
import {
  NestedCategory,
  Product,
} from "@/features/products/types/product.types";
import MegaMenuMobile from "./MegaMenuMobile";
import MegaMenuDesktop from "./MegaMenuDesktop";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  t: any;
}

export default function MegaMenu({ isOpen, onClose, t }: MegaMenuProps) {
  const [categories, setCategories] = useState<NestedCategory[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<NestedCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<{
    id: number;
    label: string;
    image: string;
  } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden", "important");
      document.documentElement.style.setProperty(
        "overflow",
        "hidden",
        "important",
      );
    } else {
      document.body.style.setProperty("overflow", "unset", "");
      document.documentElement.style.setProperty("overflow", "unset", "");
    }
    return () => {
      document.body.style.setProperty("overflow", "unset", "");
      document.documentElement.style.setProperty("overflow", "unset", "");
    };
  }, [isOpen]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await ProductsAPI.getNestedCategories();
        if (res.code === 200) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Auto-select first category and sub-category on first open
  useEffect(() => {
    if (isOpen && categories.length > 0 && !selectedCategory) {
      const firstCat = categories[0];
      setSelectedCategory(firstCat);
      if (firstCat.children && firstCat.children.length > 0) {
        setSelectedSubCategory(firstCat.children[0]);
      }
    }
  }, [isOpen, categories, selectedCategory]);

  // Animated category switch: fade-out → swap → fade-in
  const changeCategory = (cat: NestedCategory) => {
    if (selectedCategory?.id === cat.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(cat);
      setSelectedSubCategory(
        cat.children && cat.children.length > 0 ? cat.children[0] : null,
      );
      setIsTransitioning(false);
    }, 180);
  };

  // Fetch products when sub-category changes (Limit to 10 for better coverage)
  const fetchProducts = useCallback(async (subId: number) => {
    setLoading(true);
    try {
      const res = await ProductsAPI.getProducts(1, 10, subId);
      if (res.code === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, []);

  useEffect(() => {
    if (selectedSubCategory) {
      fetchProducts(selectedSubCategory.id);
    }
  }, [selectedSubCategory, fetchProducts]);

  return (
    <>
      <MegaMenuMobile
        isOpen={isOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        changeCategory={changeCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        loading={loading}
        products={products}
      />

      <MegaMenuDesktop
        isOpen={isOpen}
        onClose={onClose}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        changeCategory={changeCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        loading={loading}
        products={products}
      />
    </>
  );
}

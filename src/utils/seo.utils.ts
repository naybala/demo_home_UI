import { Metadata } from "next";

export const DEFAULT_SEO = {
  title: "Lucky Click",
  description:
    "Stay tuned for the latest updates and features of Lucky Click, your go-to platform for exciting opportunities.",
  image: "/images/lucky_click.png",
  url: "https://lucky-click.com",
  favicon: "/favicon.ico",
};

interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "profile" | "article";
}

export function constructMetadata({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  image = DEFAULT_SEO.image,
  url = DEFAULT_SEO.url,
  type = "website",
}: SeoOptions = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
      url,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    icons: {
      icon: DEFAULT_SEO.favicon,
    },
  };
}

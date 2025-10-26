import { HomePageType } from "@/types/homePage";
import { Metadata } from "next";

export const generateHomepageMetadata = async (homePage: HomePageType): Promise<Metadata> => {
  const { slug, seo } = homePage;
  const safeSlug = slug.replace("/", "");
  const ogImageUrl = seo.image?.file?.url
    ? `https:${seo.image.file.url}`
    : `${process.env.NEXT_PUBLIC_FRONTEND_URL}/seo-image.jpg`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords || "",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${safeSlug}`,
    },
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${safeSlug}`,
      siteName: seo.title,
      locale: "pt_BR",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: process.env.NEXT_PUBLIC_TWITTER || undefined,
    },
  };
};
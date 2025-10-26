import { getHomePageBySlug } from "@/lib/getHomePage";
import Home from "@/screens/Home";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateHomepageMetadata } from "@/utils/generateHomePageMetadata";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> => {
  const { lang = "pt-BR" } = await params;
  const homePage = await getHomePageBySlug("/", lang);
  if (!homePage) {
    notFound();
  }

  return generateHomepageMetadata(homePage);
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang = "pt-BR" } = await params;
  const homePage = await getHomePageBySlug("/", lang);
  if (!homePage) {
    notFound();
  }

  return <Home homePage={homePage} lang={lang} />;
}

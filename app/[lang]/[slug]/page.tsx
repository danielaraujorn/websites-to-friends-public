import {
  getHomePageBySlug,
  getHomePages,
} from "@/lib/getHomePage";
import Home from "@/screens/Home";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateHomepageMetadata } from "@/utils/generateHomePageMetadata";

export async function generateStaticParams({
  params,
}: {
  params: any;
}) {
  const { lang } = params ?? {};
  const homePages = await getHomePages({
    select: ["fields.slug"],
    locale: lang,
  });
  return (
    homePages?.map((homePage) => ({
      slug: homePage.slug,
    })) ?? []
  );
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string; lang?: string }>;
}): Promise<Metadata> => {
  const { slug, lang = "pt-BR" } = await params;
  const homePage = await getHomePageBySlug(slug, lang);
  if (!homePage) {
    notFound();
  }

  return generateHomepageMetadata(homePage);
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; lang?: string }>;
}) {
  const { slug, lang = "pt-BR" } = await params;
  const homePage = await getHomePageBySlug(slug, lang);
  if (!homePage) {
    notFound();
  }

  return <Home homePage={homePage} lang={lang} />;
}

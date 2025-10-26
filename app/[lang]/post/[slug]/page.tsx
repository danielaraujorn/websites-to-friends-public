import { getPosts } from "@/lib/getPosts";
import Blog from "@/screens/Blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams({
  params,
}: {
  params: any;
}) {
  const { lang } = params ?? {};
  const posts = await getPosts({
    select: ["fields.slug"],
    locale: lang,
  });

  return (
    posts?.map((post) => ({
      slug: post.slug,
    })) ?? []
  );
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string; lang?: string }>;
}): Promise<Metadata> => {
  const { slug, lang = "pt-BR" } = await params;
  const posts = await getPosts({
    "fields.slug": slug,
    limit: 1,
    locale: lang,
  });
  const post = posts?.[0];
  const safeSlug = slug.replace("/", "");
  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${safeSlug}`,
    },
    openGraph: {
      type: "article",
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${safeSlug}`,
      images: [post.seo.image.file.url],
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; lang?: string }>;
}) {
  const { slug, lang = "pt-BR" } = await params;
  const posts = await getPosts({
    "fields.slug": slug,
    limit: 1,
    locale: lang,
  });
  const post = posts?.[0];

  if (!post) {
    notFound();
  }

  return (
    <>
      <Blog post={post} lang={lang} />
    </>
  );
}

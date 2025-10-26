import { getHomePages } from "@/lib/getHomePage";
import { getServerSideSitemap, ISitemapField } from "next-sitemap"
import { getPosts } from "@/lib/getPosts";
import { BlogPostType } from "@/types/blogPost";

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

if (!BASE_URL) {
  // Ensure we never emit incorrect sitemap URLs
  throw new Error("NEXT_PUBLIC_FRONTEND_URL is required to generate the server sitemap");
}

const getHomePageRoutes = async (): Promise<ISitemapField[]> => {
  try {
    const homePages = await getHomePages({
      limit: 1000,
      select: ["fields.slug"],
    });

    return homePages?.map(homePage => ({
      loc: `${BASE_URL}/${homePage.slug?.replace("/", "")}`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 1,
    })) ?? []
  } catch (e) {
    console.error(e)
    return []
  }
}

const getBlogPostRoutes = async (): Promise<ISitemapField[]> => {
  try {
    const posts = await getPosts({ select: ["fields.slug", "fields.createdAt"] });
    return (
      posts?.map((post: BlogPostType) => ({
        loc: `${BASE_URL}/post/${post.slug?.replace("/", "")}`,
        lastmod: post.createdAt || new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.7,
      })) ?? []
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}


export async function GET() {
  const homePageRoutes = await getHomePageRoutes()
  const blogPostRoutes = await getBlogPostRoutes()

  return getServerSideSitemap([
    ...homePageRoutes,
    ...blogPostRoutes,
  ])
}

import { ContentfulRequest } from "@/types/request";
import { contentfulClient } from "./api";
import { HomePageType } from "@/types/homePage";
import { extractFields } from "@/utils/extractFields";
import { EntriesQueries } from "contentful";

export const getHomePages = async (options?: Omit<EntriesQueries<ContentfulRequest<"homePage", HomePageType>, undefined>, 'content_type'>): Promise<HomePageType[]> => {

  const returnedData = await contentfulClient.getEntries<ContentfulRequest<"homePage", HomePageType>>(
    {
      ...options,
      content_type: 'homePage',
      include: 2,
    }
  );

  return returnedData?.items?.map(extractFields);
}

export const getHomePageBySlug = async (slug: string, lang?: string): Promise<HomePageType> => {
  const homePages = await getHomePages({
    "fields.slug": slug,
    limit: 1,
    locale: lang,
  });
  return homePages?.[0];
};
import { ContentfulRequest } from "@/types/request";
import { contentfulClient } from "./api";
import { extractFields } from "@/utils/extractFields";
import { EntriesQueries } from "contentful";
import { BlogPostType } from "@/types/blogPost";

export const getPosts = async (options?: Omit<EntriesQueries<ContentfulRequest<"blogPost", BlogPostType>, undefined>, 'content_type'>): Promise<BlogPostType[]> => {

  const returnedData = await contentfulClient.getEntries<ContentfulRequest<"blogPost", BlogPostType>>(
    {
      ...options,
      content_type: 'blogPost',
      include: 2,
    }
  );

  return returnedData?.items?.map(extractFields);
}
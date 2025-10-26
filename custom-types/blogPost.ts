import { SeoType } from "./seo";
import { MediaType } from "./utils";
import { Document } from "@contentful/rich-text-types";

export type BlogPostType = {
  title: string;
  headerLink?: string;
  createdAt: string;
  slug: string;
  abstract: string;
  mainImages: MediaType[];
  seo: SeoType;
  content: Document;
  publishedAt?: string;
  cta?: string;
  ctaLink?: string;
  relatedPostsTitle?: string;
  relatedPostsDescription?: string;
  relatedPosts?: BlogPostType[];
}
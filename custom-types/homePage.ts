import { SeoType } from "./seo";
import { MediaType } from "./utils";
import { AboutCardType } from "./aboutCard";
import { TestimonialCardType } from "./testimonialCard";
import { BlogPostType } from "./blogPost";

export type HomePageType = {
  heroTitle: string,
  slug: string,
  heroDescription: string,
  heroImage: MediaType,
  heroCta: string,
  heroCtaLink: string,
  heroSecondaryCta?: string,
  heroSecondaryCtaLink?: string,
  seo: SeoType,
  aboutTitle: string,
  aboutDescription: string,
  aboutImage: MediaType,
  aboutCards?: AboutCardType[],
  servicesTitle: string,
  servicesDescription: string,
  servicesCards?: AboutCardType[],
  instagramButtonText: string,
  instagramLink: string,
  mapButtonText?: string,
  mapLink?: string,
  testimonialsTitle: string,
  testimonialsDescription: string,
  testimonialsCards?: TestimonialCardType[],
  footerTitle: string,
  footerDescription: string,
  copyright: string,
  blogTitle: string,
  blogDescription: string,
  relatedPosts: BlogPostType[];
};

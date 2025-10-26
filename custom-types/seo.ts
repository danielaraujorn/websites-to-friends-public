import { MediaType } from "./utils";

export type SeoType = {
  title: string,
  description: string,
  image: MediaType,
  keywords: string,
  schema: JSON, // Changed from JSON
}
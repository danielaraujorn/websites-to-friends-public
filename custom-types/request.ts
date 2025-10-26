import { EntryFieldTypes } from "contentful";

// Helper type to determine if a type is a primitive or object
type IsPrimitive<T> = T extends string | number | boolean | Date ? true : false;

// Helper type to map field types to Contentful field types
type MapToContentfulField<T> =
  T extends string ? EntryFieldTypes.Text :
  T extends number ? EntryFieldTypes.Number :
  T extends boolean ? EntryFieldTypes.Boolean :
  T extends Date ? EntryFieldTypes.Date :
  // If it's an object/relation, wrap it in EntryLink
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EntryFieldTypes.EntryLink<any>;

// Transform all fields in T to their Contentful equivalents
type TransformFields<T extends object> = {
  [K in keyof T]: MapToContentfulField<T[K]>;
};

export type ContentfulRequest<contentTypeId extends string, T extends object> = {
  contentTypeId: contentTypeId;
  fields: TransformFields<T>;
};
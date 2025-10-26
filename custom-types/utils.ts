export type MediaType = {
  title: string;
  description?: string;
  file: {
    url: string;
    fileName: string;
    contentType: string;
  }
};
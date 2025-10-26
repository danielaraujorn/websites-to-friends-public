import React from "react";
import Header from "../../components/Header";
import { BlogPostType } from "@/types/blogPost";
import {
  documentToHtmlString,
  Options,
} from "@contentful/rich-text-html-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import BlogHeader from "./components/BlogHeader";
import ImageCarousel from "./components/ImageCarousel";
import styles from "./Blog.module.scss";
import { Container } from "@/components/Container";
import Button from "@/components/Button";
import RelatedPostsSection from "@/components/RelatedPostsSection";

// Utility function to calculate read time
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const Blog: React.FC<{
  post: BlogPostType;
  lang: string;
}> = ({ post, lang }) => {
  const {
    title,
    headerLink,
    content,
    createdAt,
    abstract,
    mainImages,
    cta,
    ctaLink,
    relatedPostsTitle,
    relatedPostsDescription,
    relatedPosts,
  } = post;
  const options: Partial<Options> = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        return `<img
            src=${node.data.target.fields.file.url}
            alt=${node.data.target.fields.title}
          />`;
      },
    },
  };

  const contentHtml = documentToHtmlString(
    content,
    options,
  );

  const readTime = calculateReadTime(contentHtml);

  const jsonLd = post?.seo?.schema
    ? JSON.stringify({
        ...(post?.seo?.schema as JSON),
        url: `${
          process.env.NEXT_PUBLIC_FRONTEND_URL
        }/post/${post?.slug?.replace("/", "")}`,
        "@id": `${
          process.env.NEXT_PUBLIC_FRONTEND_URL
        }/post/${post?.slug?.replace("/", "")}`,
        datePublished: post?.createdAt,
        dateModified: post?.createdAt,
        image: post?.seo?.image?.file?.url,
      }).replace(/</g, "\\u003c")
    : undefined;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd,
          }}
        />
      )}
      <Container
        sectionClassName={styles.blog}
        containerClassName={styles.container}
      >
        <Header
          logoLink={`/${headerLink?.replace("/", "")}`}
          buttonText={cta}
          buttonLink={ctaLink}
          lang={lang}
        />

        <div className={styles.container}>
          {mainImages && mainImages.length > 0 && (
            <ImageCarousel
              images={mainImages}
              altText={title}
            />
          )}
          <BlogHeader
            title={title}
            abstract={abstract}
            readTime={readTime}
            createdAt={createdAt}
          />
          <article
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: contentHtml,
            }}
          />
          {cta && ctaLink && (
            <Button
              id="blog-cta"
              variant="contained"
              color="primary"
              fullWidth
              href={ctaLink}
              lang={lang}
            >
              {cta}
            </Button>
          )}
        </div>
      </Container>
      <RelatedPostsSection
        blogTitle={relatedPostsTitle ?? ""}
        blogDescription={relatedPostsDescription ?? ""}
        relatedPosts={relatedPosts ?? []}
        lang={lang}
      />
    </>
  );
};

export default Blog;

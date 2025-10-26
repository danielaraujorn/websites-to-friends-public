"use client";
import React from "react";
import styles from "./RelatedPostsSection.module.scss";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionSubtitle } from "@/components/SectionSubtitle";
import { BlogPostType } from "@/types/blogPost";
import { getLinkProps } from "@/utils/getLinkProps";

const RelatedPostsSection: React.FC<{
  blogTitle: string;
  blogDescription: string;
  relatedPosts: BlogPostType[];
  id?: string;
  lang: string;
}> = ({
  blogTitle,
  blogDescription,
  relatedPosts,
  id,
  lang,
}) => {
  const posts = relatedPosts?.filter(
    (p) => !!p?.slug && !!p?.title,
  );
  if (!posts?.length) return null;

  return (
    <section id={id} className={styles.blog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionTitle title={blogTitle} />
          <SectionSubtitle subtitle={blogDescription} />
        </div>

        <ScrollMenu wrapperClassName={styles.carousel}>
          {posts.map((post) => {
            const image =
              post?.seo?.image?.file?.url ||
              post.mainImages?.[0]?.file?.url;
            const alt =
              post?.seo?.image?.description ||
              post.mainImages?.[0]?.description ||
              post.title;

            const { href: postHref } = getLinkProps(
              `/post/${post.slug}`,
              lang,
            );

            return (
              <Link
                id={`post-cta-${post.slug}`}
                key={post.slug}
                href={postHref}
                className={styles.card}
              >
                {image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={styles.cover}
                    src={image}
                    alt={alt}
                  />
                )}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    {post.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </ScrollMenu>
      </div>
    </section>
  );
};

export default RelatedPostsSection;

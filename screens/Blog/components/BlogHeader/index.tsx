import React from "react";
import MetadataItem from "../MetadataItem";
import styles from "./BlogHeader.module.scss";

interface BlogHeaderProps {
  title: string;
  abstract?: string;
  readTime: number;
  createdAt: string;
}

// Utility function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  abstract,
  readTime,
  createdAt,
}) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>

      {abstract && (
        <p className={styles.abstract}>{abstract}</p>
      )}

      <div className={styles.metadata}>
        {createdAt && (
          <MetadataItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                id="Calendar--Streamline-Lucide"
                height="24"
                width="24"
              >
                <desc>
                  Calendar Streamline Icon:
                  https://streamlinehq.com
                </desc>
                <path d="M8 2v4" strokeWidth="2"></path>
                <path d="M16 2v4" strokeWidth="2"></path>
                <path
                  d="M5 4h14s2 0 2 2v14s0 2 -2 2H5s-2 0 -2 -2V6s0 -2 2 -2"
                  strokeWidth="2"
                ></path>
                <path d="M3 10h18" strokeWidth="2"></path>
              </svg>
            }
            text={formatDate(createdAt)}
          />
        )}
        <MetadataItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          text={`${readTime} min de leitura`}
        />
      </div>
    </header>
  );
};

export default BlogHeader;

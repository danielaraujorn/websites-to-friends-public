import React from "react";
import styles from "./Hero.module.scss";
import { Container } from "@/components/Container";
import Button from "@/components/Button";
import { HomePageType } from "@/types/homePage";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
const Hero: React.FC<HomePageType & { lang: string }> = ({
  heroTitle,
  heroDescription,
  heroCta,
  heroCtaLink,
  heroImage,
  heroSecondaryCta,
  heroSecondaryCtaLink,
  lang,
}) => {
  return (
    <Container
      id="hero"
      sectionClassName={styles.hero}
      containerClassName={styles.container}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>{heroTitle}</h1>
        <span className={styles.subtitle}>
          <Markdown remarkPlugins={[remarkGfm]}>
            {heroDescription}
          </Markdown>
        </span>
        <div className={styles.ctaContainer}>
          <Button
            id="hero-primary-cta"
            variant="contained"
            color="primary"
            href={heroCtaLink}
            lang={lang}
          >
            {heroCta}
          </Button>
          {heroSecondaryCta && heroSecondaryCtaLink && (
            <Button
              id="hero-secondary-cta"
              variant="outlined"
              color="secondary"
              href={heroSecondaryCtaLink}
              lang={lang}
            >
              {heroSecondaryCta}
            </Button>
          )}
        </div>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.heroImage}>
          <Image
            src={heroImage.file.url}
            alt={
              heroImage.description ||
              "Lívia - Sua Nutricionista de Confiança"
            }
            fill
            unoptimized
            priority
          />
        </div>
      </div>
    </Container>
  );
};

export default Hero;

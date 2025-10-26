import React from "react";
import styles from "./About.module.scss";
import { Container } from "@/components/Container";
import Image from "next/image";
import Button from "@/components/Button";
import { HomePageType } from "@/types/homePage";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const About: React.FC<
  HomePageType & { id?: string; lang: string }
> = ({
  aboutTitle,
  aboutDescription,
  instagramButtonText,
  instagramLink,
  mapButtonText,
  mapLink,
  aboutImage,
  aboutCards,
  id,
  lang,
}) => {
  return (
    <Container
      id={id}
      sectionClassName={styles.about}
      containerClassName={styles.container}
    >
      <div className={styles.imageContainer}>
        <div className={styles.profileImage}>
          <Image
            src={aboutImage.file.url}
            alt={
              aboutImage.description ||
              "Lívia - Sua Nutricionista de Confiança"
            }
            fill
            unoptimized
            priority
          />
        </div>
        <Button
          id="about-instagram-button"
          href={instagramLink}
          icon="/Instagram.svg"
          iconAlt="Instagram icon"
          fullWidth
          variant="contained"
          color="white"
          lang={lang}
        >
          {instagramButtonText}
        </Button>
        {mapButtonText && mapLink && (
          <Button
            id="about-map-button"
            href={mapLink}
            icon="/Map.svg"
            iconAlt="Map icon"
            fullWidth
            variant="outlined"
            color="white"
            lang={lang}
          >
            {mapButtonText}
          </Button>
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{aboutTitle}</h2>
        <span className={styles.description}>
          <Markdown remarkPlugins={[remarkGfm]}>
            {aboutDescription}
          </Markdown>
        </span>
        {aboutCards?.map((card, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>
              {card.emoji} {card.title}
            </h3>
            <span className={styles.cardDescription}>
              <Markdown remarkPlugins={[remarkGfm]}>
                {card.content}
              </Markdown>
            </span>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default About;

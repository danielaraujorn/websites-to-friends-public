import React from "react";
import styles from "./Services.module.scss";
import { Container } from "@/components/Container";
import Button from "@/components/Button";
import { HomePageType } from "@/types/homePage";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionSubtitle } from "@/components/SectionSubtitle";

const Services: React.FC<
  HomePageType & { id?: string; lang: string }
> = ({
  id,
  servicesTitle,
  servicesDescription,
  servicesCards,
  lang,
}) => {
  if (!servicesCards?.length) return null;

  return (
    <Container
      id={id}
      sectionClassName={styles.services}
      containerClassName={styles.container}
    >
      <div className={styles.header}>
        <SectionTitle title={servicesTitle} />
        <SectionSubtitle subtitle={servicesDescription} />
      </div>
      <div className={styles.grid}>
        {servicesCards?.map((service, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <span className={styles.icon}>
                  {service.emoji}
                </span>
              </div>
              <h3 className={styles.cardTitle}>
                {service.title}
              </h3>
            </div>
            <span className={styles.cardDescription}>
              <Markdown remarkPlugins={[remarkGfm]}>
                {service.content}
              </Markdown>
            </span>
            {service.cta && service.ctaLink && (
              <Button
                id="service-cta"
                color="secondary"
                fullWidth
                href={service.ctaLink}
                lang={lang}
              >
                {service.cta}
              </Button>
            )}
          </div>
        ))}
      </div>
      {/* <div className={styles.ctaSection}>
        <h3 className={styles.ctaTitle}>
          🌟 Vamos começar essa jornada juntas?
        </h3>
        <p className={styles.ctaDescription}>
          Estou aqui para te apoiar em cada passo. Vamos
          conversar sobre seus objetivos e criar um plano
          perfeito para você!
        </p>
        <Button color="white" variant="contained">
          💝 Vamos começar!
        </Button>
      </div> */}
    </Container>
  );
};

export default Services;

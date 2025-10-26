/* eslint-disable @next/next/no-img-element */

import React from "react";
import styles from "./Testimonials.module.scss";
import { Container } from "@/components/Container";
import { HomePageType } from "@/types/homePage";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Testimonials: React.FC<
  HomePageType & { id?: string }
> = ({
  testimonialsTitle,
  testimonialsDescription,
  testimonialsCards,
  id,
}) => {
  const validCards = testimonialsCards?.filter(
    ({ clientName, screenshot }) =>
      !!clientName && !!screenshot?.file?.url,
  );
  if (!validCards?.length) return null;
  return (
    <Container
      id={id}
      sectionClassName={styles.testimonials}
      containerClassName={styles.container}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>
          {testimonialsTitle}
        </h2>
        <span className={styles.subtitle}>
          <Markdown remarkPlugins={[remarkGfm]}>
            {testimonialsDescription}
          </Markdown>
        </span>
      </div>
      <div className={styles.grid}>
        {validCards?.map((testimonial, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                <span className={styles.avatarIcon}>
                  {testimonial.emoji}
                </span>
              </div>
              <div className={styles.clientInfo}>
                <h4 className={styles.clientName}>
                  {testimonial.clientName}
                </h4>
                <p className={styles.clientRole}>
                  {testimonial.clientRole}
                </p>
              </div>
            </div>
            <img
              className={styles.screenshot}
              src={testimonial.screenshot?.file?.url}
              alt={testimonial.screenshot?.description}
            />
          </div>
        ))}
      </div>
      {/* <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statNumber}>200+</div>
          <div className={styles.statLabel}>
            💚 Vidas Transformadas
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>98%</div>
          <div className={styles.statLabel}>
            😊 Satisfação das Clientes
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>5</div>
          <div className={styles.statLabel}>
            🌟 Anos de Dedicação
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>500+</div>
          <div className={styles.statLabel}>
            🎉 Sonhos Realizados
          </div>
        </div>
      </div> */}
    </Container>
  );
};

export default Testimonials;

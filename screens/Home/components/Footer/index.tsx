import React from "react";
import styles from "./Footer.module.scss";
import { HomePageType } from "@/types/homePage";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Footer: React.FC<HomePageType> = ({
  footerTitle,
  footerDescription,
  copyright,
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brandSection}>
            <h3 className={styles.brandName}>
              {footerTitle}
            </h3>
            <span className={styles.brandDescription}>
              <Markdown remarkPlugins={[remarkGfm]}>
                {footerDescription}
              </Markdown>
            </span>
            {/* <div className={styles.socialLinks}>
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <span className={styles.socialIcon}>
                  📘
                </span>
              </a>
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <span className={styles.socialIcon}>
                  📷
                </span>
              </a>
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <span className={styles.socialIcon}>
                  🐦
                </span>
              </a>
              <a
                href="#"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <span className={styles.socialIcon}>
                  💼
                </span>
              </a>
              <a
                href="#"
                className={styles.socialLink}
                aria-label="YouTube"
              >
                <span className={styles.socialIcon}>
                  📺
                </span>
              </a>
            </div> */}
          </div>

          {/* <div className={styles.newsletterSection}>
            <h4 className={styles.newsletterTitle}>
              💌 Newsletter Especial
            </h4>
            <p className={styles.newsletterDescription}>
              Receba dicas carinhosas de nutrição e receitas
              deliciosas diretamente no seu e-mail.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Seu e-mail"
                className={styles.newsletterInput}
                required
              />
              <button
                type="submit"
                className={styles.newsletterButton}
              >
                💝 Quero receber!
              </button>
            </form>
          </div> */}
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p>{copyright}</p>
          </div>
          {/* <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>
              Política de Privacidade
            </a>
            <a href="#" className={styles.legalLink}>
              Termos de Uso
            </a>
            <a href="#" className={styles.legalLink}>
              Cookies
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import { Button } from "../Button";
import Link from "next/link";

const ImageRenderer = () => {
  return (
    <Image
      src="/horizontal-logo.svg"
      alt="Logo"
      width={200}
      height={50}
      className={`${styles.logoImage} ${styles.colorLogo}`}
    />
  );
};

const Header: React.FC<{
  logoLink?: string;
  links?: { label: string; href: string }[];
  buttonText?: string;
  buttonLink?: string;
  lang: string;
}> = ({
  logoLink,
  links,
  buttonText,
  buttonLink,
  lang,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.scrolled : ""
      }`}
    >
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          {logoLink ? (
            <Link href={logoLink}>
              <ImageRenderer />
            </Link>
          ) : (
            <div className={styles.logo}>
              <ImageRenderer />
            </div>
          )}
        </div>

        {links && (
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {buttonText && buttonLink && (
          <Button
            id="header-button"
            color="primary"
            href={buttonLink}
            lang={lang}
            className={styles.cta}
            size="small"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

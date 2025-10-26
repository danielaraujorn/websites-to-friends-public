import { useId } from "react";
import styles from "./Button.module.scss";
import { getLinkProps } from "@/utils/getLinkProps";

type ButtonVariant = "contained" | "outlined";
type ButtonColor = "primary" | "secondary" | "white";

type ButtonProps = {
  id: string;
  icon?: string;
  iconAlt?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  className?: string;
  fullWidth?: boolean;
  lang: string;
  size?: "small" | "medium" | "large";
} & (
  | {
      href?: string;
      onClick?: never;
    }
  | {
      onClick?: () => void;
      href?: never;
    }
);

export const Button = ({
  icon,
  children,
  iconAlt,
  onClick,
  href,
  variant = "outlined",
  color = "primary",
  className,
  fullWidth = false,
  size = "medium",
  lang,
}: ButtonProps) => {
  const imgId = useId();
  if (href) {
    return (
      <a
        role="button"
        {...getLinkProps(href, lang)}
        className={`${styles.button} ${styles[variant]} ${
          styles[color]
        } ${className} ${
          fullWidth ? styles.fullWidth : ""
        } ${styles[size]} `}
      >
        {icon && (
          <div
            className={styles.icon}
            style={{ mask: `url(${icon})` }}
            aria-label={iconAlt}
            id={imgId}
          />
        )}
        {children}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${
        styles[color]
      } ${className} ${fullWidth ? styles.fullWidth : ""} `}
    >
      {icon && (
        <div
          className={styles.icon}
          style={{ mask: `url(${icon})` }}
          aria-label={iconAlt}
          id={imgId}
        />
      )}
      {children}
    </button>
  );
};

export default Button;

import styles from "./SectionTitle.module.scss";

export const SectionTitle = ({
  title,
}: {
  title: string;
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

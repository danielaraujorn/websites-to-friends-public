import styles from "./Container.module.scss";

export const Container = ({
  id,
  children,
  containerClassName,
  sectionClassName,
}: {
  id?: string;
  children: React.ReactNode;
  containerClassName?: string;
  sectionClassName?: string;
}) => {
  return (
    <section
      id={id}
      className={`${sectionClassName} ${styles.section}`}
    >
      <div
        className={`${containerClassName} ${styles.container}`}
      >
        {children}
      </div>
    </section>
  );
};

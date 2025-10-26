import Markdown from "react-markdown";
import styles from "./SectionSubtitle.module.scss";
import remarkGfm from "remark-gfm";

export const SectionSubtitle = ({
  subtitle,
}: {
  subtitle: string;
}) => {
  return (
    <span className={styles.description}>
      <Markdown remarkPlugins={[remarkGfm]}>
        {subtitle}
      </Markdown>
    </span>
  );
};

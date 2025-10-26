import React from "react";
import styles from "./MetadataItem.module.scss";

interface MetadataItemProps {
  icon: React.ReactNode;
  text: string;
}

const MetadataItem: React.FC<MetadataItemProps> = ({
  icon,
  text,
}) => {
  return (
    <div className={styles.metadataItem}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default MetadataItem;

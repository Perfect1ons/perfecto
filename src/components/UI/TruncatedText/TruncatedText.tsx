"use client"
import styles from "./style.module.scss";
import React, { useState } from 'react';

interface TextTruncateProps {
  text: string;
  maxLength: number;
}

const TextTruncate: React.FC<TextTruncateProps> = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const toggleOpen = () =>{
    setIsTruncated(false)
  }

  const truncatedText = isTruncated ? text.slice(0, maxLength) : text;

  return (
    <div className={styles.footerMoreSection}>
      <p className={styles.footerDescBlockTitle} onClick={toggleOpen}>{truncatedText}</p>
      {text.length > maxLength && (
        <span className={styles.truncateToggler} onClick={toggleTruncate}>{isTruncated ? 'Подробнее' : 'Скрыть'}</span>
      )}
    </div>
  );
};

export default TextTruncate;
"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {showButton && (
        <button className={styles.scrollToTopButton} onClick={scrollToTop}>
          <ArrowUpIcon />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;

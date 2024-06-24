"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface WindowWithOpenURL extends Window {
  openURL?: (url: string) => void;
}

const DownloadAppMobile = () => {
  const isMobile = useMediaQuery("(max-width: 992px)");
  const [appLink, setAppLink] = useState("");
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    let appLink;

    switch (true) {
      case userAgent.includes("android"):
        appLink =
          "https://play.google.com/store/apps/details?id=kg.max.maxapp&utm_source=app_download_android";
        break;
      case userAgent.includes("iphone") ||
        userAgent.includes("ipad") ||
        userAgent.includes("ipod"):
        appLink =
          "https://apps.apple.com/kg/app/%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%D0%BF%D0%BB%D0%B5%D0%B9%D1%81-max-kg/id6475755307";
        break;
      default:
        appLink = "";
    }

    setAppLink(appLink);

    const hideTimer = setTimeout(() => {
      setIsBannerVisible(true);
    }, 15000);

    return () => clearTimeout(hideTimer);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrollingDown(scrollTop > 20 && scrollTop > prevScrollY);
      prevScrollY = scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
  };

  const handleOpenApp = () => {
    const windowWithOpenURL = window as WindowWithOpenURL;
    if (windowWithOpenURL.openURL) {
      windowWithOpenURL.openURL(appLink);
    } else {
      window.open(appLink, "_blank");
    }
  };

  return (
    <div className={clsx(styles.app, isScrollingDown && styles.app_scrolled)}>
      {isBannerVisible && isMobile && (
        <div className={styles.appBanner}>
          <button
            onClick={handleCloseBanner}
            className={styles.appBannerCrossBtn}
          ></button>
          <div className={styles.appBannerInfo}>
            <Image
              className={styles.appBannerInfoIconImg}
              src="/img/logoApp.svg"
              width={45}
              height={45}
              alt="maxKgLogoApp"
              placeholder="blur"
              loading="lazy"
              blurDataURL="/img/logoApp.svg"
            ></Image>
            <div className={styles.appBannerInfoText}>
              <p className={styles.appBannerInfoTextDesc}>Приложение</p>
              <p className={styles.appBannerInfoTextTitle}>max.kg</p>
            </div>
          </div>
          <button onClick={handleOpenApp} className={styles.appBannerOpenBtn}>
            Открыть
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadAppMobile;

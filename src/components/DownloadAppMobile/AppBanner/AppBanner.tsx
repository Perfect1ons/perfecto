"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import cn from "clsx";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";

interface WindowWithOpenURL extends Window {
  openURL?: (url: string) => void;
}

const AppBanner = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [appLink, setAppLink] = useState("");
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("android")) {
      setAppLink(
        "https://play.google.com/store/apps/details?id=kg.max.maxapp&utm_source=app_download_android"
      );
    } else if (
      userAgent.includes("iphone") ||
      userAgent.includes("ipad") ||
      userAgent.includes("ipod")
    ) {
      setAppLink(
        "https://apps.apple.com/kg/app/%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%D0%BF%D0%BB%D0%B5%D0%B9%D1%81-max-kg/id6475755307"
      );
    }
  }, []);

  const handleCloseBanner = () => {
    setIsBannerVisible(true);
  };

  const handleOpenApp = () => {
    const windowWithOpenURL = window as WindowWithOpenURL;
    if (windowWithOpenURL.openURL) {
      windowWithOpenURL.openURL(appLink);
      setIsInstalled(true);
    } else {
      window.open(appLink, "_blank");
    }
  };
  return (
    <>
      {!isBannerVisible && isMobile && (
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
    </>
  );
};

export default AppBanner;

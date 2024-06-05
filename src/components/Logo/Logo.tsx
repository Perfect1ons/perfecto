"use client";
import Image from "next/image";
import styles from "./style.module.scss";

interface ILogoProps {
  gomain: () => void;
}

const Logo = ({ gomain }: ILogoProps) => {
  return (
    <Image
      onClick={() => gomain()}
      src={"/img/logo.svg"}
      className={styles.logo}
      width={210}
      height={40}
      alt="logo"
      priority
    />
  );
};

export default Logo;

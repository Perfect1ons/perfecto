"use client";
import Image from "next/image";
import styles from "./style.module.scss";

interface ILogoProps {
  gomain: () => void;
}

const Logo = ({ gomain }: ILogoProps) => {
  return (
    <div className={styles.logo} onClick={() => gomain()}>
      <Image
        className={styles.logo__img}
        src="/img/logo.svg"
        width={210}
        height={42} // Убедитесь, что высота соответствует значениям в CSS
        alt="logo"
        priority
      />
    </div>
  );
};

export default Logo;

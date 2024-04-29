"use client"
import Image from 'next/image'
import styles from './style.module.scss'
import Link from 'next/link';

const Logo = () => {
  return (
    <Link className={styles.logo} href={'/'}>
      <Image
        src={"/img/logo.svg"}
        className={styles.logo__img}
        width={210}
        height={40}
        alt="logo"
        priority
      />
    </Link>
  );
}

export default Logo
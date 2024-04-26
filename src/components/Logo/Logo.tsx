"use client"
import Image from 'next/image'
import styles from './style.module.scss'
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'}>
      <Image
        className={styles.logo}
        src={"/img/logo.svg"}
        width={211}
        height={83}
        alt="logo"
        priority
      />
    </Link>
  );
}

export default Logo
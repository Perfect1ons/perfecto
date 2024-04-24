"use client"
import Image from 'next/image'
import styles from './style.module.scss'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  return (
      <Image
      onClick={() => router.push('/')}
        className={styles.logo}
        src={"/img/logo.svg"}
        width={211}
        height={83}
        alt="logo"
        priority
      />
  );
}

export default Logo
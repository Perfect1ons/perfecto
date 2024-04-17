import Image from 'next/image'
import Link from 'next/link'
import styles from './style.module.scss'

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        className={styles.logo}
        src={"/img/logo.svg"}
        width={211}
        height={83}
        alt="logo"
      />
    </Link>
  );
}

export default Logo
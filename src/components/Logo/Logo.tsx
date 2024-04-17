import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={"/img/logo.svg"}
        width={211}
        height={83}
        alt="logo"
      />
    </Link>
  );
}

export default Logo
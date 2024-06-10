"use client";
import { BrandsAll } from "@/types/bannerAll";
import Image from "next/image";
import Link from "next/link";

interface IBanner {
  banner: BrandsAll;
}

const ItemBanner = ({ banner }: IBanner) => {
  const imageUrl = `https://max.kg/bimages/baner/baner_${banner?.baner[0]?.id}.jpg`;
  const relativeUrl = banner.baner[0].url.replace("https://max.kg", "");

  return (
    <Link className="topten" href={relativeUrl}>
      <Image
        className="testoviy"
        src={imageUrl}
        width={344}
        height={143}
        alt={banner.baner[0].naim}
      />
    </Link>
  );
};

export default ItemBanner;

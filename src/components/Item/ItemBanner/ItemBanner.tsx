"use client";
import { BrandsAll } from "@/types/bannerAll";
import Image from "next/image";

interface IBanner {
  banner: BrandsAll;
}
const ItemBanner = ({ banner }: IBanner) => {
  const imageUrl = `https://max.kg/bimages/baner/baner_${banner?.baner[0]?.id}.jpg`;

  return (
    <Image
      className="testoviy"
      src={imageUrl}
      // src={`https://max.kg/bimages/baner/baner_960.jpg`}
      width={344}
      height={143}
      alt={`суууу`}
    />
  );
};

export default ItemBanner;

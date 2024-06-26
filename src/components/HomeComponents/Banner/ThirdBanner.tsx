"use client"
import { IIntro } from "@/types/Home/banner";
import BannerSwiper from "./BannerSwiper/BannerSwiper"
import useMediaQuery from "@/hooks/useMediaQuery";

interface IThirdBannerProps{
    banner: IIntro[]
}

const ThirdBanner = ({banner}: IThirdBannerProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section className="thirdBanner">
      <div className="container">
        {isMobile ? <h1>apative</h1> : <BannerSwiper slides={banner} />}
      </div>
    </section>
  );
}

export default ThirdBanner
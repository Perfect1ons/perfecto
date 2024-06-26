"use client"
import { IIntro } from '@/types/Home/banner'
import BannerSwiper from './BannerSwiper/BannerSwiper'
import useMediaQuery from '@/hooks/useMediaQuery'

interface ISecondBannerProps{
    banner: IIntro[]
}

const SecondBanner = ({banner}: ISecondBannerProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="secondBanner">
      <div className="container">
        {isMobile ? <h1>apative</h1> : <BannerSwiper slides={banner} />}
      </div>
    </section>
  );
}

export default SecondBanner
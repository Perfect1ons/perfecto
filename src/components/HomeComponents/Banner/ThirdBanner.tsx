import { IIntro } from "@/types/Home/banner"
import BannerSwiper from "./BannerSwiper/BannerSwiper"

interface IThirdBannerProps{
    banner: IIntro[]
}

const ThirdBanner = ({banner}: IThirdBannerProps) => {
  return (
    <section className="thirdBanner">
        <div className="container">
            <BannerSwiper slides={banner} />
        </div>
    </section>
  )
}

export default ThirdBanner
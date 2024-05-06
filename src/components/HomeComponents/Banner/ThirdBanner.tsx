import { IIntro } from "@/types/Home/banner"
import BannerSwiper from "./BannerSwiper/BannerSwiper"

interface IThirdBannerProps{
    banner: IIntro[]
}

const ThirdBanner = ({banner}: IThirdBannerProps) => {
    const direction = "/news/454"
  return (
    <section className="thirdBanner">
        <div className="container">
            <BannerSwiper slides={banner} direction={direction}/>
        </div>
    </section>
  )
}

export default ThirdBanner
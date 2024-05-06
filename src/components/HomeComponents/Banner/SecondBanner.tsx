import { IIntro } from '@/types/Home/banner'
import styles from './style.module.scss'
import BannerSwiper from './BannerSwiper/BannerSwiper'

interface ISecondBannerProps{
    banner: IIntro[]
}



const SecondBanner = ({banner}: ISecondBannerProps) => {
    const direction = "/discounts/696"

  return (
    <section className='secondBanner'>
        <div className="container">
            <BannerSwiper slides={banner} direction={direction}/>
        </div>
    </section>
  )
}

export default SecondBanner
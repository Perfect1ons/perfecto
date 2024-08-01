import { ICard } from "@/types/Card/card";
import { truncateText } from "@/utils/utils";
import Image from "next/image";
import { GrayStar, YellowStar } from "../../../../../public/Icons/Icons";

interface IMainPageCardContentProps {
  content: ICard;
}

const CardContent = ({ content }: IMainPageCardContentProps) => {
  const truncatedTitle = truncateText(content.naim, 40);
  const truncatedDdos = truncateText(content.ddos, 32);
  return (
    <div className="card__info">
      {content.discount_prc > 0 ? (
        <div className="card__info_price">
          <div className="card__info_skidkaprice">
            <span className="card__info_skidkaprice_price">
              {content.cenaok?.toLocaleString("ru-RU")}
            </span>
            <span className="card__info_skidkaprice_price_custom">с</span>
          </div>
          <div className="card__info_oldprice">
            <span className="card__info_oldprice_price">
              {content.old_price.toLocaleString("ru-RU")}c
            </span>
          </div>
        </div>
      ) : (
        <div className="card__info_price">
          <div className="card__info_currentprice">
            <span className="card__info_currentprice_price">
              {content.cenaok.toLocaleString("ru-RU")}
            </span>
            <span className="card__info_currentprice_price_custom">с</span>
          </div>
        </div>
      )}

      <p className="card__info_title">{truncatedTitle}</p>
      <div className="card__info_rating">
        {[...Array(5)].map((_, index) => (
          <span className="card__info_rating_span" key={index}>
            {index < Math.floor(content.ocenka) ? <YellowStar /> : <GrayStar />}
          </span>
        ))}
      </div>

      <div className="card__info_ddos">
        <Image
          className="card__info_ddos_icon"
          src={`/img/deliveryIconLightBlue.svg`}
          width={20}
          height={20}
          alt="delivery_icon"
        />
        <p className="card__info_ddos_desc">{truncatedDdos}</p>
      </div>
    </div>
  );
};

export default CardContent;

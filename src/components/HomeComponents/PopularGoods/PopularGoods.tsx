"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  DeliveryIcon,
  HearthIcon,
  HearthIconRed,
} from "../../../../public/Icons/Icons";
import { useRouter } from "next/navigation";
import { IPopularGood } from "@/types/popularGoods";

interface IPopularGoodsProps {
  goods: IPopularGood[];
}

const PopularGoods = ({ goods }: IPopularGoodsProps) => {
  const imageEmpty = "https://max.kg/images/discount/empty-image.png";
  const startUrl = "https://max.kg/nal/img/";
  const initialVisibleItems = 10;
  const [visibleItems, setVisibleItems] = useState(initialVisibleItems);

  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();

  const handleShowMore = () => {
    const newVisibleItems = visibleItems + 10;
    setVisibleItems(Math.min(newVisibleItems, goods.length));
  };

  const toggleLike = (id: number) => {
    setLikedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleShowAll = () => {
    router.push("/all-boughts");
  };

  const showMoreButton =
    visibleItems < goods.length ? (
      <button
        className="default__buttons_showMore"
        onClick={handleShowMore}
      >
        Показать еще
      </button>
    ) : (
      <button
        className="default__buttons_showMore"
        onClick={handleShowAll}
      >
        Показать все
      </button>
    );

  return (
    <section className="goods">
      <div className="cardContainer container">
        <h2 className="sections__title">Популярные товары</h2>
        <div className="cardItemContainer">
          {goods.slice(0, visibleItems).map((item) => {
            let imageUrl = imageEmpty;

            if (item.photos && item.photos.length > 0) {
              const photoUrl = item.photos[0].url_part.startsWith("https://")
                ? `https://goods-photos.static1-sima-land.com/items/${item.art}/0/280.jpg`
                : `${startUrl}${item.images[0].id_post}/l_${item.photos[0].url_part}`;
              imageUrl = photoUrl;
            }

            return (
              <div key={item.id} className="cardItem">
                <Image
                  className="cardItemImg"
                  src={imageUrl}
                  width={230}
                  height={230}
                  alt={item.naim}
                />
                <div className="cardItemPrices">
                  <p
                    className={`cardItemPrice ${
                      item.old_price !== item.price ? "priceWithOld" : ""
                    }`}
                  >
                    {item.price.toLocaleString()} с
                  </p>
                  {item.old_price !== item.price && (
                    <>
                      <p className="cardItemOldPrice">
                        {item.old_price.toLocaleString()} с
                      </p>
                    </>
                  )}
                </div>
                <p className="cardItemName">{item.naim}</p>
                <div className="cardItemDelivery">
                  <DeliveryIcon />
                  <p className="cardItemDeliveryTitle">{item.ddos}</p>
                </div>
                <div className="cardItemBtns">
                  <div className="cardItemBtnsContainer">
                    <button className="cardItemBtnsAddBucket">В корзину</button>
                    <div
                      className="hearthIcon"
                      onClick={() => toggleLike(item.id)}
                    >
                      {likedItems[item.id] ? <HearthIconRed /> : <HearthIcon />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="default__buttons">{showMoreButton}</div>
      </div>
    </section>
  );
};

export default PopularGoods;

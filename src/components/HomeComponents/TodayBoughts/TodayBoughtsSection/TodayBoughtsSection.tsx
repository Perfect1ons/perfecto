"use client";//marking the component on the client side so that hooks can be used: useState, useEffect, etc.
// import hooks from react
import React, { useState } from "react";
// import Image next component for images
import Image from "next/image";
//import icons from icons.tsx
import {
  DeliveryIcon,
  HearthIcon,
  HearthIconRed,
} from "../../../../../public/Icons/Icons";
//import type from types
import { IBoughtItem } from "@/types/lastBoughts";

//interface for today boughts section props
interface ITodayBoughtsSectionProps {
  boughts: IBoughtItem[]; //importing type from types for boughts
}

const TodayBoughtsSection = ({ boughts }: ITodayBoughtsSectionProps) => {
  // image empty variable
  const imageEmpty = "https://max.kg/images/discount/empty-image.png";
  //start url max kg for images
  const startUrl = "https://max.kg/nal/img/";
  //state for liked items
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  // like toggler function
  const toggleLike = (id: number) => {
    setLikedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  // format number function for server side && client side next.js
  function formatNumber(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  //content here
  return (
    <section className="boughts">
      <div className="cardContainer container">
        <div className="cardItemContainer">
          {boughts &&
          //map method for array boughts
            boughts.map((item) => {
              //variable for image empty
              let imageUrl = imageEmpty;
              //checking for an empty photos field from data coming from props and iterating through the map
              if (item.photos && item.photos.length > 0) {
                const photoUrl = item.photos[0].url_part.startsWith("https://")
                  ? `https://goods-photos.static1-sima-land.com/items/${item.art}/0/280.jpg`
                  : `${startUrl}${item.images[0].id_post}/l_${item.photos[0].url_part}`;
                imageUrl = photoUrl;
              }
              //returning content and substituting data using map
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
                      {formatNumber(item.old_price)} с
                    </p>
                    {item.old_price !== item.price && (
                      <>
                        <p className="cardItemOldPrice">
                          {formatNumber(item.old_price)} с
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
                      <button className="cardItemBtnsAddBucket">
                        В корзину
                      </button>
                      <div
                        className="hearthIcon"
                        onClick={() => toggleLike(item.id)}
                      >
                        {likedItems[item.id] ? (
                          <HearthIconRed />
                        ) : (
                          <HearthIcon />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
//export this component
export default TodayBoughtsSection;

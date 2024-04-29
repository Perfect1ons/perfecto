"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import { IFiltersBrand } from "@/types/filtersBrand";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import {
  DeliveryIcon,
  HearthIcon,
  HearthIconRed,
} from "../../../../public/Icons/Icons";
import { useState } from "react";
import Link from "next/link";

interface IProps {
  product: ICatalogsProducts;
  brand: IFiltersBrand;
}
const category = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-category-filled"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M10 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z"
      stroke-width="0"
      fill="currentColor"
    />
    <path
      d="M20 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z"
      stroke-width="0"
      fill="currentColor"
    />
    <path
      d="M10 13h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z"
      stroke-width="0"
      fill="currentColor"
    />
    <path
      d="M20 13h-6a1 1 0 0 0  -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z"
      stroke-width="0"
      fill="currentColor"
    />
  </svg>
);
const list = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
  >
    <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path>
  </svg>
);
const star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-star"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#aaa"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
  </svg>
);
const starFill = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-star-filled"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
      stroke-width="0"
      fill="#fde16d"
    />
  </svg>
);
const ProductsPage = ({ product, brand }: IProps) => {
  console.log(brand.filter?.[11]?.type_name);
  const imageEmpty = "https://max.kg/images/discount/empty-image.png";
  const startUrl = "https://max.kg/nal/img/";
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  function formatNumber(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  const toggleLike = (id: number) => {
    setLikedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.fitersContainer}>
        <h1>Фильтры</h1>
        <div>
          <form className={styles.form}>
            <h1>Цена:</h1>
            <div className={styles.formContainer}>
              <input className={styles.input} type="text" placeholder="от 0" />
              <input className={styles.input} type="text" placeholder="до 0" />
            </div>
          </form>
        </div>
        <div>
          <h2>Бренд</h2>
          {brand.brand.map((item) => {
            return (
              <div className={styles.check}>
                <input type="checkbox" />
                <li key={item} className={styles.brand}>
                  {item}
                </li>
              </div>
            );
          })}
        </div>
        <div>
          <h2>Срок доставки</h2>
          <ul>
            {brand.variant_day.map((day) => {
              const days = day.split("-");
              let deliveryTime;

              if (days.length === 1) {
                deliveryTime = "1 день";
              } else {
                const minDays = parseInt(days[0]);
                const maxDays = parseInt(days[1]);
                if (maxDays - minDays === 1) {
                  deliveryTime = "1-2 дня";
                } else {
                  deliveryTime = `${minDays}-${maxDays} дней`;
                }
              }

              return (
                <div className={styles.check}>
                  <input type="checkbox" />
                  <li key={day} className={styles.brand}>
                    {deliveryTime}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          {brand &&
            brand.filter &&
            Object.values(brand.filter).map((filterType) => (
              <div key={filterType.id_type}>
                <h3>{filterType.type_name}</h3>
                <ul>
                  {filterType.filter &&
                    Object.values(filterType.filter).map((filter) => (
                      <div className={styles.check}>
                        <input type="checkbox" />
                        <li key={filter?.id_filter}>
                          {filter?.name}: {filter?.kol}
                        </li>
                      </div>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div> */}
      <ol className={styles.breadcrumb}>
        <li className={styles.links}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link href="/" className={styles.link}>
            {product.category.name}
          </Link>
        </li>
      </ol>
      <section className="boughts">
        <div className={styles.sortsContainer}>
          <div className={styles.sortContainer}>
            <h4 className={styles.sortsItem}>Сортировать:</h4>
            <h4 className={styles.sortItem}>по популярности</h4>
            <h4 className={styles.sortItem}>по новизне</h4>
            <h4 className={styles.sortItem}>сначала дешевле</h4>
            <h4 className={styles.sortItem}>сначала дороже</h4>
          </div>
          <div className={styles.sortButtons}>
            <button>{category()}</button>
            <button>{list()}</button>
          </div>
        </div>
        <div className="cardItemContainer">
          {product.model.map((item) => {
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
                    {formatNumber(item.price)} с
                  </p>
                  {item.old_price && item.old_price !== item.price && (
                    <>
                      <p className="cardItemOldPrice">
                        {formatNumber(item.old_price)} с
                      </p>
                    </>
                  )}
                </div>
                <p className="cardItemName">{item.naim}</p>
                <div className={styles.codeProduct}>
                  <h2 className={styles.product__code}>Код: {item?.art}</h2>
                  <div className={styles.rating}>
                    {Array.from({ length: Math.floor(item.ocenka) }).map(
                      (_, index) => (
                        <span key={index} className={styles.rating__span}>
                          {starFill()}
                        </span>
                      )
                    )}
                    {item.ocenka % 1 !== 0 && <span>{star()}</span>}
                    {Array.from({ length: 5 - Math.ceil(item.ocenka) }).map(
                      (_, index) => (
                        <span key={index} className={styles.rating__span}>
                          {star()}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="cardItemDelivery">
                  <DeliveryIcon />
                  <p className="cardItemDeliveryTitle">{item.ddos}</p>
                </div>
                <div className="cardItemBtns">
                  <div className="cardItemBtnsContainer">
                    <button className="cardItemBtnsAddBucket">В корзину</button>
                    <div onClick={() => toggleLike(item.id)}>
                      {likedItems[item.id] ? <HearthIconRed /> : <HearthIcon />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

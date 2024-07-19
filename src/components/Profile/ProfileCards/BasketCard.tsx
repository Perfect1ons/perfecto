import Image from "next/image";
import styles from "./card.module.scss";
import Link from "next/link";
import { url } from "@/components/temporary/data";
import { ICard } from "@/types/Card/card";

interface IBasketCardProps {
  cartCount: number;
  cart: ICard[];
}

const BasketCard = ({ cartCount, cart }: IBasketCardProps) => {
  return (
      <Link className="link" href={"/cart"}>
        <div className={styles.profile__userInfo}>
          <div className={styles.profile__userInfo_header}>
            <div className={styles.profile__userInfo_icon}>
              <Image
                src={"/img/orderbag.svg"}
                width={45}
                height={45}
                alt="clipboard"
              />
            </div>
            <div>
              <p className={styles.profile__userInfo_name}>Корзина</p>
              {cartCount <= 0 ? (
                <p className={styles.orders}>Товаров в корзине нет</p>
              ) : (
                <p className={styles.orders}>
                  В корзине{" "}
                  <span className={styles.orders__count}>{cartCount}</span>{" "}
                  {cartCount % 10 === 1 && cartCount % 100 !== 11
                    ? "товар"
                    : cartCount % 10 >= 2 &&
                      cartCount % 10 <= 4 &&
                      !(cartCount % 100 >= 12 && cartCount % 100 <= 14)
                    ? "товара"
                    : "товаров"}
                </p>
              )}
            </div>
          </div>
          <div className={styles.orders__images}>
            {cart && cart?.length > 0 ? (
              <>
                {cart &&
                  cart.slice(0, 3).map((data) => {
                    const imageUrl =
                      data.photos.length > 0
                        ? data.photos[0]?.url_part.startsWith("https://goods")
                          ? `${data.photos[0]?.url_part}280.jpg`
                          : data.photos[0]?.url_part.startsWith("https://")
                          ? data.photos[0]?.url_part
                          : `${url}nal/img/${data.id_post}/l_${data.photos[0]?.url_part}`
                        : "/img/noPhoto.svg";
                    return (
                      <Link
                        href={`/item/${data.id_tov}/${data.url}`}
                        key={data.id}
                        className={styles.orders__imageContainer}
                      >
                        <Image
                          className={styles.orders__imageContainer__image}
                          width={100}
                          height={100}
                          alt=""
                          src={imageUrl}
                        />
                      </Link>
                    );
                  })}
                {cart && cart.length > 3 && (
                  <Link href="/cart" className={styles.profile__showMore}>
                    Ещё {cart.length - 3}
                  </Link>
                )}
              </>
            ) : (
              <div className={styles.orders__images__toCatalog}>
                <button className={styles.profile__exit}>
                  Перейти в каталог
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
  );
};

export default BasketCard;

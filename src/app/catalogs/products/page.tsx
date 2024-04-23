import { subCatalog } from "@/types/subCatalog";
import styles from "./style.module.scss";
import Image from "next/image";

interface IProps {
  product: subCatalog;
}
const heart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-heart-filled"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#777"
    fill="#777"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
      stroke-width="0"
      fill="#777"
    />
  </svg>
);
const basket = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-shopping-cart-filled"
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
      d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z"
      stroke-width="0"
      fill="#ffffff"
    />
  </svg>
);
const delivery = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-truck-delivery"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#0c54a1"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
    <path d="M3 9l4 0" />
  </svg>
);
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
const ProductsPage = ({ product }: IProps) => {
  return (
    <div className={styles.container}>
      <div>
        {product.model.map((filter) => {
          return <h1>{filter.trademark}</h1>;
        })}
      </div>
      <div className={styles.containerProducts}>
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
        <ul className={styles.products}>
          {product.model.map((item) => {
            return (
              <div className={styles.product}>
                <div className={styles.product__head}>
                  <div className={styles.images}>
                    {item?.photos && item.photos.length > 0 ? (
                      <Image
                        src={`https://max.kg/nal/img/${item.images[0].id_post}/l_${item.photos[0]?.url_part}`}
                        alt={item.naim}
                        width={180}
                        height={180}
                      />
                    ) : (
                      <Image
                        src="https://max.kg/images/discount/empty-image.png"
                        alt={item.naim}
                        width={193}
                        height={157}
                      />
                    )}
                  </div>
                  <h1
                    className={styles.product__price}
                  >{`${item.price} ⃀.`}</h1>
                  <li className={styles.product__name}>
                    {item.naim.split(" ").slice(0, 8).join(" ")}
                  </li>
                  <h2 className={styles.product__code}>Код: {item?.art}</h2>
                </div>
                <div className={styles.product__foot}>
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
                  <li className={styles.delivery}>
                    {delivery()}{" "}
                    <span className={styles.delivery__span}>{item?.ddos}</span>
                  </li>
                  <div className={styles.buttons}>
                    <button className={styles.buttons__busket}>
                      {basket()} В корзину
                    </button>
                    <button className={styles.buttons__heart}>{heart()}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;

import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import { Cross } from "../../../../public/Icons/Icons";
import DOMPurify from "isomorphic-dompurify";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";

interface IProductReviewProps {
  data: Items;
  func: () => void;
  visible: boolean;
}
const ItemDescriptionModal = ({ data, func, visible }: IProductReviewProps) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div
        onClick={func}
        className={cn(styles.container__backdrop, {
          [styles.activeBackdrop]: visible,
        })}
      ></div>
      <div className={cn(styles.wrapper, { [styles.visible]: visible })}>
        <div className={styles.wrapper__container}>
          <h2 className={styles.wrapper__container__h2}>О товаре</h2>
          <h2 className={styles.wrapper__container__h2}>Характеристики</h2>
          <h2 className={styles.wrapper__container__h2}>Видео</h2>

          <button onClick={func} className={styles.wrapper__container__btn}>
            <Cross />
          </button>
        </div>
        <div className={styles.aboutProduct}>
          <div className={styles.aboutProduct__description}>
            <p
              className={styles.aboutProduct__description_p}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.description),
              }}
            />
          </div>
          <div className={styles.aboutProduct}>
            <h2 className={styles.aboutProduct__h2}>Характеристики</h2>
            <div className={styles.aboutProduct__description}>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.specification),
                }}
                className={styles.aboutProduct__description_p}
              />
            </div>
          </div>
        </div>
        <div className={styles.wrapper__containerFooter}>
          <h2 className={styles.wrapper__container__h2}>{data.price}с.</h2>
          <button
            onClick={() => dispatch(addProductToCart(data))}
            className={styles.wrapper__containerFooter__btn}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDescriptionModal;

import { ICardProductItems, Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { CartIcon } from "../../../../public/Icons/Icons";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";

interface IBuyBtnProps {
  data: ICardProductItems;
  handleCartEmpty: () => void;
  product: any;
  handleAddToCart: () => void;
  shouldFocusInput: boolean;
  onFocusHandled: () => void;
}

const MobileBuyBtn = ({
  data,
  handleCartEmpty,
  product,
  handleAddToCart,
  shouldFocusInput,
  onFocusHandled,
}: IBuyBtnProps) => {
  // для отображения при пролистывании
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrollingDown(scrollTop > 20 && scrollTop > prevScrollY);
      prevScrollY = scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={clsx(
        styles.container_position,
        isScrollingDown && styles.container_position_scrolled
      )}
    >
      {data.items?.cenaok < 1000 ? (
        !product?.quantity ? (
          <button
            onClick={handleAddToCart}
            className={clsx(styles.btn, styles.btn_cart)}
          >
            <div className={styles.btn_content}>
              <span className="add__to_cart_icon">
                <CartIcon />
              </span>
              В корзину
            </div>
          </button>
        ) : (
          <CartReducerBtn
            data={data.items}
            onCartEmpty={handleCartEmpty}
            shouldFocusInput={shouldFocusInput}
            onFocusHandled={onFocusHandled}
          />
        )
      ) : (
        <button className={clsx(styles.btn, styles.btn_buy)}>
          Купить за: {data.items.cenaok.toLocaleString("ru-Ru")}{" "}
          <span className={styles.btn_simbol}>с</span>
        </button>
      )}
    </section>
  );
};

export default MobileBuyBtn;

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
  addToCart: () => void;
}

const MobileBuyBtn = ({
  data,
  handleCartEmpty,
  product,
  addToCart,
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

  // отдельный стейт и калбэк для того, чтобы фокус был на инпут редюсера здесь, а не в родительском
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

  const handleAddToCart = () => {
    addToCart();
    setShouldFocusInput(true);
  };

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
            onFocusHandled={() => setShouldFocusInput(false)}
          />
        )
      ) : (
        <button className={clsx(styles.btn, styles.btn_buy)}>
          Купить за {data.items.cenaok.toLocaleString("ru-Ru")}{" "}
          <span className={styles.btn_simbol}>⃀</span>
        </button>
      )}
    </section>
  );
};

export default MobileBuyBtn;

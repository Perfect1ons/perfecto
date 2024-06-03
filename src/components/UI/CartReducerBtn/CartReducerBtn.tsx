"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import { MinusIcon, PlusIcon, TrashIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductQuantity,
  addProductToCart,
  deleteProductQuantity,
  removeProductFromCart,
} from "@/store/reducers/cart.reducer";
import { RootState } from "@/store";

interface ICartReducerBtnProps {
  data: Items;
  onCartEmpty: () => void;
}

const CartReducerBtn = ({ data, onCartEmpty }: ICartReducerBtnProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);

  const addToCart = () => {
    const minQty = data.minQty || 1; // Используем minQty, если доступно, иначе по умолчанию 1

    if (product) {
      dispatch(addProductQuantity(data.id));
    } else {
      const newProduct = { ...data, quantity: minQty };
      dispatch(addProductToCart(newProduct));
    }
  };

  const removeFromCart = () => {
    const minQty = data.minQty || 1; // Используем minQty, если доступно, иначе по умолчанию 1

    if (product) {
      if (product.quantity && product.quantity <= minQty) {
        dispatch(removeProductFromCart(data.id));
        onCartEmpty();
      } else {
        dispatch(deleteProductQuantity(data.id));
      }
    }
  };

  return (
    <div className={styles.btn}>
      <button onClick={removeFromCart} className={styles.btn_left}>
        {product?.quantity && product.quantity <= data.minQty ? (
          <TrashIcon />
        ) : (
          <MinusIcon />
        )}
      </button>
      <span className={styles.btn_screen}>{product?.quantity || 0}</span>
      <button onClick={addToCart} className={styles.btn_right}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default CartReducerBtn;

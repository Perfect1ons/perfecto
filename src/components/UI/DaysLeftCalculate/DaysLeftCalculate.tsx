import React from "react";
import styles from "./style.module.scss";
import cn from "clsx";

interface ProductInfoProps {
  price_update: string;
}

const parseDate = (dateString: string): Date | null => {
  const parts = dateString.split("/");
  if (parts.length !== 3) {
    return null;
  }
  const [day, month, year] = parts.map(Number);
  if (!day || !month || !year) {
    return null;
  }
  return new Date(year, month - 1, day);
};

const calculateDaysLeft = (endDate: string): number => {
  const currentDate = new Date();
  const endDiscountDate = parseDate(endDate);

  if (!endDiscountDate) {
    return NaN;
  }

  const timeDifference = endDiscountDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysLeft;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ price_update }) => {
  const daysLeft = calculateDaysLeft(price_update);

  if (isNaN(daysLeft) || daysLeft < 0) {
    return null;
  }

  return (
    <span
      className={cn(
        daysLeft < 0 && styles.hidden,
        styles.product_info_price__update_price
      )}
    >
      Осталось дней до окончания скидки: {daysLeft}
    </span>
  );
};

export default ProductInfo;

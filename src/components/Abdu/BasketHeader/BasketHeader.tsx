import styles from "./style.module.scss";
import { CheckIcons, TrashIcon } from "../../../../public/Icons/Icons";
import clsx from "clsx";

interface BasketHeaderProps {
  authToken?: string;
  count: number;
  openModal: () => void;
  setView: React.Dispatch<
    React.SetStateAction<"delivery" | "curier" | "oplata" | "confirm">
  >;
  selectAll: () => void;
  deselectAll: () => void;
  isAllSelected: boolean;
  selectedIds: string;
}

const BasketHeader = ({
  authToken,
  count,
  openModal,
  setView,
  selectAll,
  deselectAll,
  isAllSelected,
  selectedIds,
}: BasketHeaderProps) => {
  const handleSelectAllClick = () => {
    if (isAllSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  };

  return (
    <div className={styles.controlContainer}>
      <h1 className={styles.basketTilte}>
        В корзине - {count} {" "}
        {count % 10 === 1 && count % 100 !== 11
          ? "товар"
          : count % 10 >= 2 &&
            count % 10 <= 4 &&
            !(count % 100 >= 12 && count % 100 <= 14)
          ? "товара"
          : "товаров"}{" "}
      </h1>

      <div onClick={handleSelectAllClick} className={styles.checkBoxContainer}>
        <span
          className={clsx("showFiltersUlContainer__check", {
            ["showFiltersUlContainer__checkActive"]: isAllSelected,
          })}
        >
          {isAllSelected ? <CheckIcons /> : null}
        </span>
        Выбрать все товары
      </div>
      <button
        onClick={() => {
          openModal();
          setView("confirm");
        }}
        disabled={!isAllSelected && !selectedIds}
        className={styles.trashButton}
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default BasketHeader;

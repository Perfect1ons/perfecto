import styles from "./style.module.scss";
import cn from "clsx";

interface MobileCatalogProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function MobileCatalog({ isOpen, setOpen }: MobileCatalogProps) {
  const clickHandler = setOpen;

  return (
    <>
      <button
        className={cn(styles.mod_hamburger, "hamburger", "hamburger_3dy", {
          ["is_active"]: isOpen,
        })}
        type="button"
      >
        <span className="hamburger_box">
          <span className="hamburger_inner"></span>
        </span>
      </button>
      <span>Каталог</span>
    </>
  );
}

"use client";
import Link from "next/link";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// импорты стилей и иконок
import styles from "./style.module.scss";
import cn from "clsx";
import {
  AuthIconActive,
  AuthIconDark,
  CatalogSearchIcon,
  FavoritesIconActive,
  FavoritesIconDark,
  CartIconActive,
  CartIconDark,
  HomeIcon,
  HomeIconActive,
  XMark,
  BellIcon,
} from "../../../../public/Icons/Icons";

// типизации и компоненты
import MobileModal from "../MobileModal/MobileModal";
import MobileCatalog from "../MobileCatalog/MobileCatalog";
import MobSearch from "./MobSearch";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { ISearch } from "@/types/Search/search";
import { getFastUserSearch } from "@/api/clientRequest";
import MobileSearch from "../MobileSearch/MobileSearch";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import AuthModal from "@/components/AuthModal/AuthModal";
import { AuthContext } from "@/context/AuthContext";

export interface ICatalogProps {
  catalogs: ICatalogMenu | undefined;
  click: () => void;
  loading: boolean;
  isMobileModalOpen: boolean;
  setMobileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  history: string[];
  isAuthed: any;
  favorites: number;
}

export default function MobileNav({
  catalogs,
  click,
  loading,
  isMobileModalOpen,
  setMobileModalOpen,
  history,
  isAuthed,
  favorites,
}: ICatalogProps) {
  // переключает state когда setMobileModalOpen не равен isOpen, т.е. вкл/выкл
  const openMobileModal = () => {
    setMobileModalOpen(!isMobileModalOpen);
    click();
  };

  // для того, чтобы менять иконки и стили Link-ов когда их pathname совпадает c текущей страницей
  const pathname = usePathname();

  // для отображения при пролистывании
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const { notif } = useContext(AuthContext);

  // const handleSubmit = () => {
  //   window.location.href = `/seek/search=${searchValue}`;
  // };

  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const cart = useSelector((state: RootState) => state.cart.cart);

  const updateFavoritesCount = () => {
    setFavoritesCount(favorites);
  };

  const updateCartItemCount = () => {
    const baskets = JSON.parse(localStorage.getItem("basket") || "[]");
    setCartItemCount(baskets.length);
  };

  useEffect(() => {
    updateFavoritesCount();
    updateCartItemCount();

    window.addEventListener("favoritesUpdated", updateFavoritesCount);
    window.addEventListener("cartUpdated", updateCartItemCount);

    return () => {
      window.removeEventListener("favoritesUpdated", updateFavoritesCount);
      window.removeEventListener("cartUpdated", updateCartItemCount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

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
  const [inputActive, setInputActive] = useState<boolean>(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [fastValue, setFastValue] = useState<ISearch | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(history);

  const fetchData = async (query: string) => {
    if (!query) {
      setFastValue(undefined);
      return;
    }
    try {
      const response: ISearch = await getFastUserSearch(query);
      setFastValue(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event);
    const newValue = event.target.value;
    setSearchQuery(newValue);
    if (newValue.length < 2) {
      setFastValue(undefined);
      return;
    }
    fetchData(decodeURIComponent(newValue));
    setInputActive(true);
  };

  const handleInputFocus = () => {
    setInputActive(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchWrapperRef.current &&
      !searchWrapperRef.current.contains(event.target as Node)
    ) {
      setFastValue(undefined);
      setInputActive(false);
    }
  };

  const handleCloseModal = () => {
    onInputChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
    setFastValue(undefined);
    setInputActive(false);
  };

  const handleSearch = async (query: string) => {
    const response = await fetch("/api/search-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: query }),
    });

    const result = await response.json();
    if (result.success) {
      setSearchHistory((prevHistory) => {
        // Проверяем, есть ли уже такой элемент в истории поиска
        if (prevHistory.some((item) => item === query)) {
          return prevHistory; // Не обновляем историю, если значение уже есть
        }

        // Ограничиваем количество элементов до 10
        const updatedHistory = [...prevHistory, query].slice(-10);
        return updatedHistory;
      });
      console.log("История поиска обновлена");
    } else {
      console.error("Не удалось обновить историю поиска");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue.trim() !== "") {
      await handleSearch(searchValue);
      window.location.href = `/seek?search=${encodeURIComponent(
        searchValue
      )}&page=1`;
    }
  };

  const handleDelete = async (queryToDelete: string) => {
    const response = await fetch("/api/search-history", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: queryToDelete }),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Запрос удален из истории поиска");
      setSearchHistory((prevHistory) =>
        prevHistory.filter((query) => query !== queryToDelete)
      );
    } else {
      console.error("Не удалось удалить запрос из истории поиска");
    }
  };

  const handleDeleteAll = async () => {
    const response = await fetch("/api/search-history", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Все запросы удалены из истории поиска");
      setSearchHistory([]);
    } else {
      console.error("Не удалось удалить все запросы из истории поиска");
    }
  };

  const handleHistoryItemClick = async (query: string) => {
    await handleSearch(query);
    window.location.href = `/seek?search=${encodeURIComponent(query)}&page=1`;
  };

  const shouldShowHistory =
    inputActive && searchHistory.length > 0 && !fastValue;
  const shouldShowFastValue =
    inputActive &&
    fastValue &&
    (fastValue.catalog.length > 0 || fastValue.model._meta.totalCount > 0);
  const [isAuthVisible, setAuthVisible] = useState(false);
  const closeModals = () => setAuthVisible(false);
  const openAuthModal = () => setAuthVisible(true);

  return (
    <>
      <AuthModal isVisible={isAuthVisible} close={closeModals} />

      <MobileModal isVisible={isMobileModalOpen}>
        <div className={styles.catalog_wrap}>
          <MobSearch
            handleButtonClick={() => {}}
            handleChange={handleChange}
            handleInputFocus={handleInputFocus}
            handleSubmit={handleSubmit}
            searchInputRef={searchInputRef}
            searchValue={searchValue}
            setIsOpen={setMobileModalOpen}
          />
          <MobileSearch
            handleCloseModal={handleCloseModal}
            handleHistoryItemClick={handleHistoryItemClick}
            searchHistory={searchHistory}
            shouldShowFastValue={shouldShowFastValue}
            shouldShowHistory={shouldShowHistory}
            fastValue={fastValue}
            handleDelete={handleDelete}
            searchWrapperRef={searchWrapperRef}
            handleDeleteAll={handleDeleteAll}
          />
          {/* <MobileCatalog
            catalogs={catalogs}
            closeMain={openMobileModal}
            loading={loading}
          /> */}
          {!shouldShowHistory && !shouldShowFastValue && (
            <MobileCatalog
              catalogs={catalogs}
              closeMain={openMobileModal}
              loading={loading}
            />
          )}
        </div>
      </MobileModal>

      <section
        className={cn(
          styles.mobile_menu,
          `${isScrollingDown ? styles.scrolled : ""}`
        )}
      >
        <ul className={styles.ul}>
          <Link
            href="/"
            className={styles.option}
            onClick={() => setMobileModalOpen(false)}
          >
            {pathname === "/" ? <HomeIconActive /> : <HomeIcon />}
            <span
              className={
                pathname === "/"
                  ? `${cn(styles.option_span, styles.optionSpan_active)}`
                  : styles.option
              }
            >
              Главная
            </span>
            {isAuthed && notif > 0 && (
              <span className={cn(styles.option_count, styles.option_countSvg)}>
                {<BellIcon />}
              </span>
            )}
          </Link>

          <li className={styles.option} onClick={openMobileModal}>
            <div className={styles.option} onClick={() => click()}>
              <span className={styles.option__icon}>
                {isMobileModalOpen === true ? <XMark /> : <CatalogSearchIcon />}
              </span>
              <span>Каталог</span>
            </div>
          </li>

          <Link
            href="/favorites"
            className={styles.option}
            onClick={() => {
              if (!isAuthed) {
                openAuthModal();
              } else {
                setMobileModalOpen(false);
              }
            }}
          >
            {pathname === "/favorites" ? (
              <FavoritesIconActive />
            ) : (
              <FavoritesIconDark />
            )}
            <span
              className={
                pathname === "/favorites"
                  ? `${cn(styles.option_span, styles.optionSpan_active)}`
                  : styles.option
              }
            >
              Избранные{" "}
            </span>
            {isAuthed && favoritesCount > 0 && (
              <span className={styles.option_count}>
                {favoritesCount > 99 ? "99+" : favoritesCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className={styles.option}
            onClick={() => setMobileModalOpen(false)}
          >
            {pathname === "/cart" ? <CartIconActive /> : <CartIconDark />}
            <span
              className={
                pathname === "/cart"
                  ? `${cn(styles.option_span, styles.optionSpan_active)}`
                  : styles.option
              }
            >
              Корзина{" "}
            </span>
            {cartItemCount > 0 && (
              <span className={styles.option_count}>
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </Link>

          <Link
            href="/profile"
            className={styles.option}
            onClick={() => {
              if (!isAuthed) {
                openAuthModal();
              } else {
                setMobileModalOpen(false);
              }
            }}
          >
            {pathname === "/profile" ? <AuthIconActive /> : <AuthIconDark />}
            <span
              className={
                pathname === "/profile"
                  ? `${cn(styles.option_span, styles.optionSpan_active)}`
                  : styles.option
              }
            >
              Профиль
            </span>
          </Link>
        </ul>
      </section>
    </>
  );
}

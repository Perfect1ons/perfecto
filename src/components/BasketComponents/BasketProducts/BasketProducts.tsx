"use client";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import {
  removeProductFromCart,
  toggleProductSelection,
} from "@/store/reducers/cart.reducer";
import { url } from "@/components/temporary/data";
import { ICard } from "@/types/Card/card";
import FavoriteModal from "@/components/FavoritesComponents/FavoritesModal/FavoritesModal";
import BasketCard from "./BasketCard/BasketCard";
import useMediaQuery from "@/hooks/useMediaQuery";
import ReactPaginate from "react-paginate";
const BasketProducts = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const data = useSelector((store: RootState) => store.cart);
  const [favoriteItems, setFavoriteItems] = useState<{
    [key: string]: boolean;
  }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    updateFavoriteItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFavoriteItems = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = favorites.reduce(
      (acc: { [key: string]: boolean }, favItem: ICard) => {
        acc[favItem.id_tov] = true;
        return acc;
      },
      {}
    );
    setFavoriteItems(updatedFavorites);
  };

  const [added, setAdded] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [allItemsSelected, setAllItemsSelected] = useState(false); // State to track if all items are selecte

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Показывать по 20 товаров на странице

  const isMobile = useMediaQuery("(max-width: 480px)");

  const offset = currentPage * itemsPerPage;
  const currentItems = data.cart.slice(offset, offset + itemsPerPage);

  const handleToggleAllItems = () => {
    setAllItemsSelected(!allItemsSelected);
  };

  const handleFavoriteClick = (e: React.MouseEvent, cardData: ICard) => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let message = "";

    const favoriteData = {
      id: cardData.id,
      id_tov: cardData.id_tov,
      id_post: cardData.id_post,
      old_price: cardData.old_price,
      discount_prc: cardData.discount_prc,
      naim: cardData.naim,
      ddos: cardData.ddos,
      cenaok: cardData.cenaok,
      url: cardData.url,
      photos: cardData.photos,
      ocenka: cardData.ocenka,
      status: cardData.status,
      minQty: cardData.minQty,
    };

    if (favoriteItems[cardData.id_tov]) {
      favorites = favorites.filter(
        (fav: ICard) => fav.id_tov !== cardData.id_tov
      );
      message = "Товар удален из избранного.";
      setFavoriteItems((prev) => ({ ...prev, [cardData.id_tov]: false }));
      setIsRedirect(false);
    } else {
      favorites.push(favoriteData);
      message = "Товар добавлен в избранное. Нажмите, чтобы перейти к списку.";
      setFavoriteItems((prev) => ({ ...prev, [cardData.id_tov]: true }));
      setIsRedirect(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));

    setModalMessage(message);
    setModalVisible(true);
  };

  const handleCartEmpty = () => {
    setAdded(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  // remove from redux cart storage function
  const removeFromCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ICard
  ) => {
    event.stopPropagation();
    event.preventDefault();

    // Диспетчеризуем действие для удаления товара из Redux хранилища
    dispatch(removeProductFromCart(item.id)); // Предположим, что у вас есть действие removeProductFromCart, которое принимает id товара для удаления

    // Если вы хотите выполнить дополнительные действия после удаления (например, обновление состояния), добавьте их здесь
  };
  const handleToggleSelection = (id: number) => {
    dispatch(toggleProductSelection(id));
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    const newPage = selected + 1;
    const queryParams = new URLSearchParams();

    if (newPage > 0) queryParams.set("page", newPage.toString());
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Calculate total pages based on favorites length and itemsPerPage
  const pageCount = Math.ceil(data.cart.length / itemsPerPage);

  return (
    <div className={styles.cardsAllContainer}>
      <FavoriteModal
        isVisible={isModalVisible}
        message={modalMessage}
        isRedirect={isRedirect}
        onClose={handleModalClose}
      />
      {currentItems.map((item) => {
        const imageUrl =
          item.photos.length > 0
            ? item.photos[0]?.url_part.startsWith("https://goods")
              ? `${item.photos[0]?.url_part}280.jpg`
              : item.photos[0]?.url_part.startsWith("https://")
              ? item.photos[0]?.url_part
              : `${url}nal/img/${item.id_post}/l_${item.photos[0]?.url_part}`
            : "/img/noPhoto.svg";
        const isFavorite = favoriteItems[item.id_tov] || false;
        return (
          <BasketCard
            key={item.id_tov}
            item={item}
            imageUrl={imageUrl}
            handleToggleSelection={() => handleToggleSelection(item.id)}
            isFavorite={isFavorite}
            rating={Math.floor(item.ocenka)}
            handleFavoriteClick={(e: any) => handleFavoriteClick(e, item)}
            removeFromCart={(e: any) => removeFromCart(e, item)}
            handleCartEmpty={handleCartEmpty}
            shouldFocusInput={shouldFocusInput}
            setShouldFocusInput={() => setShouldFocusInput(false)}
          />
        );
      })}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          forcePage={currentPage}
          breakLabel={isMobile ? ".." : "..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={isMobile ? 2 : 3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item-btn"}
          previousLinkClassName={"page-link-previous"}
          nextClassName={"page-item-btn"}
          nextLinkClassName={"page-link-next"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default BasketProducts;

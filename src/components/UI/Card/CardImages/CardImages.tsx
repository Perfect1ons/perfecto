import Link from "next/link";
import React from "react";
import { ICard } from "@/types/Card/card";
import ImageSlider from "../ImageSlider/ImageSlider";
import { CardFavoritesIcon } from "../../../../../public/Icons/Icons";

interface ICardImagesProps {
  images: string[];
  cardData: ICard;
  isFavorite: boolean;
  isAuthed: boolean;
  handleFavoriteClick: (e: React.MouseEvent) => void;
}

const CardImages = ({
  images,
  cardData,
  isFavorite,
  isAuthed,
  handleFavoriteClick,
}: ICardImagesProps) => {
  return (
    <div className="card__images">
      <Link href={`/item/${cardData.id_tov}/${cardData.url}`} className="link">
        <ImageSlider images={images} name={cardData.naim} />
        {cardData.discount_prc > 0 && (
          <div className="card__info_skidkapercent">
            {cardData.discount_prc}%
          </div>
        )}
      </Link>
      <span
        title={
          isAuthed && isFavorite
            ? "Удалить из избранного"
            : "Добавить в избранное"
        }
        className={`card__info_addFavorites ${
          isAuthed && isFavorite ? "card__info_addedFavorites" : ""
        }`}
        onClick={handleFavoriteClick}
      >
        <CardFavoritesIcon />
      </span>
    </div>
  );
};

export default CardImages;

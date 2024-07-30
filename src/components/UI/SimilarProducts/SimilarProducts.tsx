"use client";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";
import Card from "../Card/Card";
interface ISimilarProps {
  similar?: ISimilarItem[];
  id_cart?: string | null | undefined;
}

const SimilarProducts = ({ similar, id_cart }: ISimilarProps) => {
  return (
    <div className="similarProducts">
      <h5 className="sections__title container">Похожие товары</h5>
      <div className="cards">
        {similar?.map((cards, index) => {
          return <Card cardData={cards} key={index} id_cart={id_cart} />;
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;

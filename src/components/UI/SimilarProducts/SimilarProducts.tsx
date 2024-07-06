"use client";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";
import Card from "../Card/Card";
interface ISimilarProps {
  similar: ISimilarItem[];
}

const SimilarProducts = ({ similar }: ISimilarProps) => {
  return (
    <div className="similarProducts">
      <h5 className="sections__title container">Похожие товары</h5>
      <div className="cards">
        {similar.map((cards, index) => {
          return <Card cardData={cards} key={index} />;
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;

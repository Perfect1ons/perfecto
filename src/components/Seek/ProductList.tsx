import React from "react";
import { ISeekItem } from "@/types/Search/seek";
import dynamic from "next/dynamic";

const SeekCards = dynamic(() => import("@/components/Seek/SeekCard"));

interface ProductListProps {
  items: ISeekItem[];
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
  return (
    <div className="main__news_cards">
      {items.map((item, index) => (
        <SeekCards key={index} cardData={item} />
      ))}
    </div>
  );
};

export default ProductList;

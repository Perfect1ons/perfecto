import { ISeekItem } from "@/types/Search/seek";
import dynamic from "next/dynamic";
import SeekCardColumn from "./SeekCardColumn";

const SeekCards = dynamic(() => import("@/components/Seek/SeekCard"));

interface ProductListProps {
  items: ISeekItem[];
  isColumnView: boolean; // Добавляем пропс для определения вида отображения
}

const ProductList: React.FC<ProductListProps> = ({ items, isColumnView }) => {
  return (
    <div
      className={isColumnView ? "main__news_cards_column" : "main__news_cards"}
    >
      {items.map((item, index) =>
        isColumnView ? (
          <SeekCardColumn key={index} cardData={item} />
        ) : (
          <SeekCards key={index} cardData={item} />
        )
      )}
    </div>
  );
};

export default ProductList;

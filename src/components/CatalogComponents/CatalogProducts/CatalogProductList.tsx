import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import CatalogProductsCard from "./CatalogProductsCard";
import dynamic from "next/dynamic";

interface ProductListProps {
  items: Tov[];
  isColumnView: boolean; // Добавляем пропс для определения вида отображения
}
const CatalogProductsColumn = dynamic(() => import("./CatalogProductsColumn"));

const CatalogProductList = ({ items, isColumnView }: ProductListProps) => {
  return (
    <div
      className={isColumnView ? "main__news_cards_column" : "main__news_cards"}
    >
      {items.map((item, index) =>
        isColumnView ? (
          <CatalogProductsColumn key={index} cardData={item} />
        ) : (
          <CatalogProductsCard key={index} cardData={item} />
        )
      )}
    </div>
  );
};

export default CatalogProductList;

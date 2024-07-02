import dynamic from "next/dynamic";
import { ICategoryModel } from "@/types/Catalog/catalogFilters";
import Card from "@/components/UI/Card/Card";
import { Tov } from "@/types/Catalog/catalogProducts";

interface ProductListProps {
  items: ICategoryModel[] | Tov[];
  isColumnView: boolean;
}
const CardColumn = dynamic(
  () => import("@/components/UI/CardColumn/CardColumn")
);

const CatalogProductList = ({ items, isColumnView }: ProductListProps) => {
  return (
    <div
      className={isColumnView ? "main__news_cards_column" : "cards"}
    >
      {items.map((item, index) =>
        isColumnView ? (
          <CardColumn key={index} cardData={item} />
        ) : (
          <Card key={index} cardData={item} />
        )
      )}
    </div>
  );
};

export default CatalogProductList;

import Card from "../UI/Card/Card";


interface ProductListProps {
  items: any[];
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
  return (
    <div
      className={"cards"}
    >
      {items.map((item, index) =>
        <Card key={index} cardData={item} />
      )}
    </div>
  );
};

export default ProductList;

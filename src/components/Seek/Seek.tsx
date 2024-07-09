"use client";
import { ISeekCatalog, ISeekItem } from "@/types/Search/seek";
import ProductList from "./ProductList";
import SeekCatalog from "./SeekCatalog";
interface SeekProps {
  catalog: ISeekCatalog[];
  product: ISeekItem[];
}

const Seek: React.FC<SeekProps> = ({ catalog, product }) => {
  return (
    <section className="seek">
      <div className="container">
        <h1 className="seek__catalog_title">Найдено в категориях</h1>
        <SeekCatalog catalog={catalog}/>
      </div>
      <ProductList items={product}  />
    </section>
  );
};

export default Seek;


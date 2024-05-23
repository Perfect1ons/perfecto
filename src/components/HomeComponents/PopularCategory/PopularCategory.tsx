import { IPopularCategory } from "@/types/PopularCategory";
import CategorySwiper from "./CategorySwiper/CategorySwiper";
export interface ICategory {
  category: IPopularCategory[];
}

const PopularCategory = ({ category }: ICategory) => {
  return (
    <section className="popular__category">
      <div className="container">
        <h1 className="sections__title">Популярные категории</h1>
        <CategorySwiper category={category} />
      </div>
    </section>
  );
};

export default PopularCategory;

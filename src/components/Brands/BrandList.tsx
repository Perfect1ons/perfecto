"use client";
import BrandCard from "./BrandCard";
import MainLoader from "../UI/Loader/MainLoader";
import clsx from "clsx";
import styles from './style.module.scss'
import { IMainPageBrands } from "@/types/HomeTypes/brands";

interface IBrandProps {
  brands: IMainPageBrands;
}

const BrandsList = ({ brands }: IBrandProps) => {
  return (
    <div>
      {brands.length === 0 ? (
        <MainLoader />
      ) : (
        <>
          <h1 className={clsx("sections__title container", styles.top)}>Бренды</h1>
          <div className={clsx("container", styles.brands__container)}>
            {brands.map((brand, index) => (
              <BrandCard key={index} name={brand.name} link={brand.id} />
            ))}
          </div>

        </>
      )}
    </div>
  );
};

export default BrandsList;




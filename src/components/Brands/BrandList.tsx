"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BrandCard from "./BrandCard";
import { IBrands } from "@/types/brands";
import MainLoader from "../UI/Loader/MainLoader";
import clsx from "clsx";
import styles from './style.module.scss'

interface IBrandProps {
  brands: IBrands;
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




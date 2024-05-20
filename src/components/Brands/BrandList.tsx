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
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 48;
  const maxPagesToShow = 5;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const page = parseInt(query.get("page") || "1", 10);
    setCurrentPage(page);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  const currentBrands = brands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const maxPage = totalPages;

  const renderPaginationButtons = () => {
    const paginationButtons = [];
    let startPage = 1;
    if (currentPage > maxPagesToShow - 1) {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
    }
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={clsx(
            "pagination__button",
            i === currentPage ? "pagination__button_active" : ""
          )}
        >
          {i}
        </button>
      );
    }
    return paginationButtons;
  };

  return (
    <div>
      {brands.length === 0 ? (
        <MainLoader />
      ) : (
        <>
          <h1 className={clsx("sections__title container", styles.top)}>Бренды</h1>
          <div className={clsx("container", styles.brands__container)}>
            {currentBrands.map((brand, index) => (
              <BrandCard key={index} name={brand.name} link={brand.id} />
            ))}
          </div>
          <div className="pagination">
            <button
              className={clsx(
                "pagination__button_custom",
                currentPage === 1 && "pagination__button_disactive"
              )}
              onClick={handleFirstPage}
              title="Первая"
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            <button
              className={clsx(
                "pagination__button",
                currentPage === 1 && "pagination__button_disactive"
              )}
              onClick={handlePrevPage}
              title="Предыдущая"
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {renderPaginationButtons()}
            <button
              className={clsx(
                "pagination__button",
                currentPage === maxPage && "pagination__button_disactive"
              )}
              onClick={handleNextPage}
              title="Следующая"
              disabled={currentPage === maxPage}
            >
              {">"}
            </button>
            <button
              className={clsx(
                "pagination__button_custom",
                currentPage === maxPage && "pagination__button_disactive"
              )}
              onClick={handleLastPage}
              title="Последняя"
              disabled={currentPage === maxPage}
            >
              {">>"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BrandsList;




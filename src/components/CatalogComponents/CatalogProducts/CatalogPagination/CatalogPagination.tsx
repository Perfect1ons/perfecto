import React from 'react'
import ReactPaginate from 'react-paginate';

interface ICatalogPaginationProps {
  forcePage: number;
  pageCount: number;
  pageChange: (selectedItem: { selected: number }) => void; 
  isMobile: boolean;
}

const CatalogPagination = ({forcePage,pageCount, pageChange,isMobile}: ICatalogPaginationProps) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      forcePage={forcePage}
      nextLabel={">"}
      breakLabel={isMobile ? ".." : "..."}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={isMobile ? 2 : 3}
      onPageChange={pageChange}
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item-btn"}
      previousLinkClassName={"page-link-previous"}
      nextClassName={"page-item-btn"}
      nextLinkClassName={"page-link-next"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}

export default CatalogPagination
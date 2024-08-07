import ReactPaginate from "react-paginate";

interface IFavoritesPaginationProps {
  isMobile: boolean;
  pageCount: number;
  currentPage: number;
  handlePageClick: ({ selected }: { selected: number }) => void;
}

const FavoritesPagination = ({
  isMobile,
  pageCount,
  currentPage,
  handlePageClick,
}: IFavoritesPaginationProps) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      forcePage={currentPage}
      breakLabel={isMobile ? ".." : "..."}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={isMobile ? 2 : 3}
      onPageChange={handlePageClick}
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
};

export default FavoritesPagination;

import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

interface IFavoritesPaginationProps {
  pageCount: number;
  currentPage: number;
}

const FavoritesPagination = ({
  pageCount,
  currentPage,
}: IFavoritesPaginationProps) => {
  const router = useRouter();

  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1;
    router.push(`/favorites?page=${selectedPage}`);
  };

  return (
    <ReactPaginate
      initialPage={currentPage - 1}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item-btn"}
      previousLinkClassName={"page-link-previous"}
      nextClassName={"page-item-btn"}
      nextLinkClassName={"page-link-next"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
    />
  );
};

export default FavoritesPagination;

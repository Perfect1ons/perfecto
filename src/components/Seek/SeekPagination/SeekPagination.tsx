"use client";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

interface SeekPaginationProps {
    path: string;
  pageCount: number;
  currentPage: number;
}

const SeekPagination: React.FC<SeekPaginationProps> = ({
    path,
  pageCount,
  currentPage,
}) => {
  const router = useRouter();

  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1; // Pagination starts from 0, so add 1
    router.push(`/seek?search=${path}&page=${selectedPage}`);
  };

  return (
    <ReactPaginate
      initialPage={currentPage - 1} // ReactPaginate pages start from 0
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

export default SeekPagination;
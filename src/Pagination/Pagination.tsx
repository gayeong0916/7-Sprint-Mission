import arrowleft from "../images/arrow_left.svg";
import arrowright from "../images/arrow_right.svg";
import "./pagination.css";

interface PaginationProps {
  pageNumber: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

function getVisiblePageNumbers(currentPage: number, totalPages: number) {
  const visiblePages = 3;
  let startPage: number;

  if (currentPage >= totalPages - visiblePages + 1) {
    startPage = totalPages - visiblePages + 1;
  } else {
    startPage = currentPage - visiblePages + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  const endPage = Math.min(startPage + visiblePages - 1, totalPages);
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}

function Pagination({ pageNumber, currentPage, onPageChange }: PaginationProps) {
  const PageNumberArray = getVisiblePageNumbers(currentPage, pageNumber);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageNumber) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="button-wrapper">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={arrowleft} alt="왼쪽 화살표" />
      </button>
      {PageNumberArray.map((page) => (
        <button
          key={page}
          className={`pagination-button ${
            page === currentPage ? "selectd-page" : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageNumber}
      >
        <img src={arrowright} alt="오른쪽 화살표" />
      </button>
    </div>
  );
}

export default Pagination;

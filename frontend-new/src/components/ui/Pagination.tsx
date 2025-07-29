import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }: Props) => {
  const getPageNumbers = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  

  return (
    <div className={`pt-3 flex justify-center items-center ${className}`}>
      { totalPages !== 0 &&
       <>
       <ChevronLeft
        className={`cursor-pointer text-muted-dark ${currentPage === 1 && "opacity-40 cursor-not-allowed"}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      />
      <div className="flex gap-1">
        {getPageNumbers().map((page) => (
          <div
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-6 w-6 text-xs text-white text-center rounded-sm leading-6 cursor-pointer ${
              page === currentPage ? "bg-primary-light" : "bg-muted/30"
            }`}
          >
            {page}
          </div>
        ))}
      </div>
      <ChevronRight
        className={`cursor-pointer text-muted-dark ${currentPage === totalPages && "opacity-40 cursor-not-allowed"}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      />
      </>  }
    </div>
  );
};

import getVisiblePages from "@/lib/getVisiblePages";
import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalPages: number;
  currPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currPage,
  onPageChange,
}) => {

  const visiblePages = getVisiblePages(currPage, totalPages);

  return (
    <div className="flex justify-center mt-4 space-x-1">
      <Button
        variant="outline"
        size="lg"
        onClick={() => onPageChange(currPage - 1)}
        disabled={currPage <= 1}
        aria-label="Go to previous page"
      >
        previous
      </Button>

      {visiblePages.map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={page}
            variant={page === currPage ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
            aria-current={page === currPage ? "page" : undefined}
          >
            {page}
          </Button>
        ) : (
          <span key={`ellipsis-${index}`} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700">
            ...
          </span>
        )
      )}

      <Button
        variant="outline"
        size="lg"
        onClick={() => onPageChange(currPage + 1)}
        disabled={currPage >= totalPages}
        aria-label="Go to next page"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

type PageItem = number | "...";
function getVisiblePages(currentPage: number, totalPages: number) {
    const result: PageItem[] = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          result.push(i);
        }
      } else if (currentPage <= 4) {
        result.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        result.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        result.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    
      return result;
}
export default getVisiblePages;
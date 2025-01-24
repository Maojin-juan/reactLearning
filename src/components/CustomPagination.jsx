import PropTypes from "prop-types";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

function CustomPagination({ pagination, changePage }) {
  const handleClick = async (event, page) => {
    event.preventDefault();
    changePage(page);
  };

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            // className={pagination.has_pre ? "" : "invisible"}
            className={
              pagination.has_pre ? undefined : "pointer-events-none opacity-50"
            }
            onClick={(event) => handleClick(event, pagination.current_page - 1)}
            href="/"
            aria-label="Previous"
            tabIndex={pagination.has_pre ? undefined : -1}
          />
        </PaginationItem>
        {[...new Array(pagination.total_pages)].map((_, i) => (
          <PaginationItem key={`${i}_page`}>
            <PaginationLink
              isActive={i + 1 === pagination.current_page}
              href="/"
              onClick={(event) => handleClick(event, i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            // className={pagination.has_next ? "" : "invisible"}
            className={
              pagination.has_next ? undefined : "pointer-events-none opacity-50"
            }
            onClick={(event) => handleClick(event, pagination.current_page + 1)}
            href="/"
            aria-label="Next"
            tabIndex={pagination.has_next ? undefined : -1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

CustomPagination.propTypes = {
  pagination: PropTypes.shape({
    total_pages: PropTypes.number,
    current_page: PropTypes.number,
    has_pre: PropTypes.bool,
    has_next: PropTypes.bool,
  }).isRequired,
  changePage: PropTypes.func.isRequired,
};

export default CustomPagination;

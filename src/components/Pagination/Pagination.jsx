import './Pagination.css'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  function changePage(page) {
    if (typeof onPageChange === 'function') {
      onPageChange(page)
    }
  }

  return (
    <nav className="pagination" aria-label="Product pagination">
      <button
        type="button"
        className="paginationButton"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className="paginationPages">
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={`paginationButton ${page === currentPage ? 'paginationCurrentPage' : ''}`}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="paginationButton"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  )
}

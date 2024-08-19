import React from 'react';
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`btn ${i === currentPage ? 'btn-primary' : 'btn-secondary'} mx-1`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination-container mt-3">
      <button onClick={handlePrevious} disabled={currentPage === 1} className="btn btn-secondary mx-1">
        Previous
      </button>
      {renderPageNumbers()}
      <button onClick={handleNext} disabled={currentPage === totalPages} className="btn btn-secondary mx-1">
        Next
      </button>
    </div>
  );
};

export default Pagination;

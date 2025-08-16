import React from 'react';
import './Pagination.css';

    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
   
      const pagesToShow = 5;
      let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    
      if (endPage - startPage + 1 < pagesToShow) {
        startPage = Math.max(1, endPage - pagesToShow + 1);
      }

      const pageNumbers = [];
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      return (
        <div className="pagination">
          {/* Previous Button */}
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          
      
          {startPage > 1 && (
            <>
              <button onClick={() => onPageChange(1)}>1</button>
              {startPage > 2 && <span>...</span>}
            </>
          )}

         
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}

         
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span>...</span>}
              <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
            </>
          )}

        
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      );
    };
export default Pagination;
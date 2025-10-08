import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxButtons = 3;
  const halfMaxButtons = Math.floor(maxButtons / 2);

  let startPage = Math.max(1, currentPage - halfMaxButtons);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const PageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className='mt-8 flex items-center justify-center gap-2'>
      <button
        onClick={() => PageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='rounded-md px-2 py-2 disabled:cursor-not-allowed disabled:opacity-30'
      >
        <ChevronLeft size={24} />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => PageChange(1)}
            className={`rounded-md px-4 py-2 ${
              currentPage === 1 ? 'bg-project-600 text-white' : 'bg-white text-black'
            } transition-colors`}
          >
            1
          </button>
          {startPage > 2 && <span className='px-2 py-2 text-gray-900'>...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => PageChange(page)}
          className={`rounded-md px-4 py-2 ${
            currentPage === page ? 'bg-project-600 text-white' : 'bg-white text-gray-700'
          } transition-colors`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className='px-2 py-2 text-gray-900'>...</span>}
          <button
            onClick={() => PageChange(totalPages)}
            className={`rounded-md px-4 py-2 ${
              currentPage === totalPages ? 'bg-project-600 text-white' : 'bg-white'
            } transition-colors`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => PageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='rounded-md px-2 py-2 disabled:cursor-not-allowed disabled:opacity-30'
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;

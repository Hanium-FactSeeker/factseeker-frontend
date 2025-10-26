interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  className = '',
}: PaginationProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className="border-gray-normal text-gray-strong hover:bg-gray-light flex h-8 w-8 items-center justify-center rounded border bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        &lt;
      </button>
      <span className="text-black-normal text-sm">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="border-gray-normal text-gray-strong hover:bg-gray-light flex h-8 w-8 items-center justify-center rounded border bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;

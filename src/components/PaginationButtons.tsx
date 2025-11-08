import React from "react";

interface Props {
    currentPage: number;
    lastPage: number;
    onChange: (page: number) => void;
}

const PaginationButtons: React.FC<Props> = ({ currentPage, lastPage, onChange }) => (
    <div className="flex justify-center mt-6 gap-2 flex-wrap">
        <button
            disabled={currentPage === 1}
            onClick={() => onChange(currentPage - 1)}
            className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-40 transition"
        >
            &lt;
        </button>
        <span className="px-4 py-2 bg-gray-800 rounded-md">
      Page {currentPage} / {lastPage || 1}
    </span>
        <button
            disabled={currentPage === lastPage}
            onClick={() => onChange(currentPage + 1)}
            className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-40 transition"
        >
            &gt;
        </button>
    </div>
);

export default PaginationButtons;

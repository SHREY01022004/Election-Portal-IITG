import React from "react";

const PaginationBar = ({
  candidatesPerPage,
  totalCandidates,
  setCurrentPage,
  currentPage,
}) => {
  const pageNums = [];

  for (let i = 1; i <= Math.ceil(totalCandidates / candidatesPerPage); i++) {
    pageNums.push(i);
  }

  return (
    <nav className="flex w-full justify-end items-center">
      <p>Page number:</p>  
      <ul className="flex justify-end my-2 px-4">
        {pageNums.map((num, i) => {
          return (
            <li
              key={i}
              onClick={() => setCurrentPage(num)}
              className={`px-2 py-1 border-2 ${
                num === currentPage ? "border-blue-400 text-blue-500" : ""
              } hover:border-blue-400 hover:text-blue-400 cursor-pointer`}
            >
              {num}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PaginationBar;

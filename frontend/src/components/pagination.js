import React from "react";
import "../styles/pagination.css";

const Pagination = ({ currentPage, lastPage, increasePage, decreasePage }) => {
  const buttons = [];

  buttons.push(
    <button
      disabled={currentPage <= 1}
      key={"page" + buttons.length}
      onClick={(e) => {
        decreasePage();
      }}
    >
      Previous page
    </button>
  );
  buttons.push(
    <button
      disabled={currentPage >= lastPage}
      key={"page" + buttons.length}
      onClick={(e) => {
        increasePage();
      }}
    >
      Next page
    </button>
  );
  return <div className="pagination">{buttons}</div>;
};

export default Pagination;
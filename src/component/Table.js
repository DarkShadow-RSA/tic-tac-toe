import React from "react";

const Table = ({ square, handleClick }) => {
  const checkifempty = (e) => {
    if (e === "X" || e === "O") {
      return "squareSelected";
    } else {
      return "square";
    }
  };

  return (
    <div className="table">
      {square.map((e, keyId) => {
        return (
          <button
            key={keyId}
            className={checkifempty(e)}
            onClick={() => handleClick(keyId)}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
};

export default Table;

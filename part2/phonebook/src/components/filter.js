import React from "react";

const Filter = ({ state, handler }) => {
    const handleFilterChange = (event) => {
        handler(event.target.value);
      };
  return (
    <div>
      filter shown with {" "}
      <input value={state} placeholder='Search a name' onChange={handleFilterChange} />
    </div>
  );
};

export default Filter
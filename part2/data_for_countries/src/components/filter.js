import React from "react";

const Filter = ({ state, handler }) => {
    return (
      <div>
        filter countries
        <input value={state} onChange={handler} />
      </div>
    );
  };

  export default Filter
  
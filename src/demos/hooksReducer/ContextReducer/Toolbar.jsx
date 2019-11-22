import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "./store";
const App = () => {
  const {
    dispatch,
    state: { searchCondition }
  } = useContext(StoreContext);
  const handleOnChange = payload => {
    dispatch({ type: "UPDATE_SEARCH_CONDITION", payload });
  };
  return (
    <div>
      name:{" "}
      <input
        type="text"
        onChange={e => {
          const name = e.target.value;
          const _searchCondition = { ...searchCondition, name };
          handleOnChange({ searchCondition: _searchCondition });
        }}
        value={StoreContext.name}
      />
      age:{" "}
      <input
        type="text"
        onChange={e => {
          const age = e.target.value;
          const _searchCondition = { ...searchCondition, age };
          handleOnChange({ searchCondition: _searchCondition });
        }}
        value={StoreContext.age}
      />
      {/* <button onClick={handleClick}>查询</button> */}
    </div>
  );
};

export default App;

import React, { useEffect, useState, useReducer } from "react";
import { initialState, init, reducer, StoreContext } from "./store";
import Toolbar from "./Toolbar";
import Table from "./Table";

const App = () => {
  //执行useReducer 获取 state,dispatch
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <>
      {/* 将state,dispatch作为context的初始化数据 */}
      <StoreContext.Provider value={{ state, dispatch }}>
        <Toolbar />
        <Table />
      </StoreContext.Provider>
    </>
  );
};
export default App;

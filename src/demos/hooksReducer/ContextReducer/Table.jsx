import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "./store";

const App = () => {
  const { state } = useContext(StoreContext);
  const {
    searchCondition: { name, age }
  } = state;
  return (
    <div>
      <h1>姓名是:{name}</h1>
      <h1>年龄是:{age}</h1>
    </div>
  );
};

export default App;

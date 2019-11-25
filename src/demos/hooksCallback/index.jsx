import React, { useState, useEffect, useContext, createContext, useCallback } from "react";
import Container from "./Container";

const App = () => {
  const [count, setCount] = useState(0);
  const handleClickCount = () => {
    setCount(c => {
      return c + 1;
    });
  };

  const handleClickConsole = () => {
    console.log("handleClickConsole");
  };
  const cb = useCallback(handleClickConsole, []);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleClickCount}>click+1 </button>
      <Container handleClick={handleClickConsole} ></Container>
      {/* <Container handleClick={cb} ></Container> */}
    </div>
  );
};

export default App;

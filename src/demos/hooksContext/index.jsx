import React, { useState, useEffect, useContext, createContext } from "react";
import Container from './Container';
import { StoreContext } from "./store";

const App = () => {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date().toString());

  const handleClickCount = () => {
    setCount(c => {
      return c + 1;
    });
  };
  const handleClickTime = () => {
    setTime(() => new Date().toString());
  };

  return (
    <StoreContext.Provider value={{count,time}}>
      <div>
        <button onClick={handleClickCount}>clickCount</button>
        <button onClick={handleClickTime}>clickTime</button>
        <Container />
      </div>
    </StoreContext.Provider>
  );
};

export default App;

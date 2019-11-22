import React, { useState, useEffect, useContext, createContext, useCallback, useMemo, useRef } from "react";
import { usePreValue, useInterval } from "../utils/hooks";
const App = () => {
  const [count, setCount] = useState(0);
  const preCount = usePreValue(count);
  const handleClick = () => {
    setCount(val => val + 1);
  };
  // const timer = useInterval(() => {
  //   console.log("定时器执行了");
  // }, 1000);
  // const handleKillTimer = () => {
  //   console.log("定时器卸载了");
  //   clearInterval(timer);
  // };

  return (
    <div>
      <h1>Count:{count}</h1>
      <h1>PreCount:{preCount}</h1>
      <div>
        <button onClick={handleClick}>click+1</button>
      </div>
      <div>{/* <button onClick={handleKillTimer}>卸载定时器</button> */}</div>
    </div>
  );
};

export default App;

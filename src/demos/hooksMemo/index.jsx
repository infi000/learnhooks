import React, { useState, useEffect, useContext, createContext, useCallback, useMemo } from "react";
import Container from "./Container";
import { useInputValue } from "../utils/hooks";

const App = () => {
  const [count, setCount] = useState(0);
  let inputParams = useInputValue("sftc");
  // {value:"",onChange:()=>{}}
  // useEffect(()=>{
  //     console.log(123123)
  // },[inputParams.value])
  const handleClickCount = () => {
    setCount(c => {
      return c + 1;
    });
  };

  const handleClick = () => {
    console.log("点击", count);
  };

  const handleChange = () => {
    console.log("input改变了", count);
  };
  const handleMemoCbs = useMemo(() => {
    return {
      handleClick,
      handleChange
    };
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={handleClickCount}>click </button>
      </div>
      {/* <Container handleClick={handleClick} handleChange={handleChange}  title={title}></Container> */}
      <div>
        <input type="text" {...inputParams} />
      </div>
      <Container {...handleMemoCbs} title={inputParams.value}></Container>
    </div>
  );
};

export default App;

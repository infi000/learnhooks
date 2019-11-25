import React, { useState, useEffect, useContext, createContext, memo } from "react";
import { StoreContext } from "./store";

const ComCount = memo(() => {
  console.log("ComCount");
  const { count } = useContext(StoreContext);
  return <h1>count:{count}</h1>;
});

const ComTime = memo(() => {
  console.log("ComTime");
  const { time } = useContext(StoreContext);
  return <h1>time:{time}</h1>;
});

const Container = memo(() => {
  console.log("Container重新渲染");
  return (
    <div>
      <h1>这是Container</h1>
      <ComCount />
      <ComTime />
    </div>
  );
});

export default Container;

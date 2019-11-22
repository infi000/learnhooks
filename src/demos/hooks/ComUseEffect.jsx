import React, { useState, useEffect } from "react";
//每一个组件内的函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获某次渲染中定义的props和state。
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setCount(count + 1);
      // setCount((count)=>count+1);
      console.log("count,", count);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <h1>count:{count}</h1>
    </div>
  );
}

export default App;

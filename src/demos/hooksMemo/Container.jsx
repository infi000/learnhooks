import React, { memo } from "react";
const Container = memo(props => {
  console.log("Container加载了");
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={props.handleClick}>click</button>
      
    </div>
  );
});

export default Container;

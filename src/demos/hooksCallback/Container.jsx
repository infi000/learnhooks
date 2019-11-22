import React, { useEffect, memo } from "react";
import { useInputValue } from "../utils/hooks";
const Container = memo(props => {
  console.log("Container渲染");
  let inputParams = useInputValue(0);
  // {value:"",onChange:()=>{}}
  // useEffect(()=>{
  //     console.log(123123)
  // },[inputParams.value])
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={props.handleClick}>click</button>
      <div>
        <input type="text" {...inputParams} />
      </div>
    </div>
  );
});

export default Container;

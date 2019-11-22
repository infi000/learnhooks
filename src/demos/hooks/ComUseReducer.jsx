import React, { useEffect, useState, useReducer } from "react";
//eg.1 指定初始 state
// const initialState = { count: 0 };

// const  reducer = (state, action) => {
//   switch (action.type) {
//     case "increment":
//       return { count: state.count + 1 };
//     case "decrement":
//       return { count: state.count - 1 };
//     default:
//       throw new Error();
//   }
// }

// const  App = () =>  {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       <h1>Count: {state.count}</h1>
//       <button onClick={() => dispatch({ type: "decrement" })}>-</button>
//       <button onClick={() => dispatch({ type: "increment" })}>+</button>
//     </>
//   );
// }

//eg.2 惰性初始化
const initialCount = 0;
const init = initialCount => {
  return { count: initialCount };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return init(action.payload);
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "reset", payload: initialCount })}>Reset</button>
    </>
  );
};
export default App;

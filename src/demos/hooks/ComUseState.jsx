import React, { useState ,useEffect} from "react";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "wang"});
  console.log("加载了");
  const handleClickCount = () => {
    console.log("handleClickCount");
    count++;
    // setCount(count+1)
    return "";
  };
  const handleClickUser = () => {
    console.log("handleClickCount");
    // user.name="li";
    setUser((state)=>{
      state.name="li"
      return state;
    });
    return "";
  };

  // useEffect(() => {
  //   console.log("object");
  // }, [NaN]);

  return (
    <div>
      <h1>count:{count}</h1>
      <button onClick={handleClickCount}>handleClickCount</button>
      <h1>name:{user.name}</h1>
      <button onClick={handleClickUser}>handleClickUser</button>
    </div>
  );
}

export default App;

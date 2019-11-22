//React 不知道第二个 useState 的 Hook 应该返回什么。
//React 会以为在该组件中第二个 Hook 的调用像上次的渲染一样，对应得是 persistForm 的 effect，但并非如此。
//从这里开始，后面的 Hook 调用都被提前执行，导致 bug 的产生。

import React, { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("Mary");

  // if (typeof name !== "number") {
  //   useEffect(function persistForm() {
  //     localStorage.setItem("formData", name);
  //   });
  // }
    useEffect(function persistForm() {
      localStorage.setItem("formData", name);
    });

  const [surname, setSurname] = useState("Poppins");
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  return (
    <button
      onClick={() => {
        setName(Number(new Date()));
      }}
    >
      click
    </button>
  );
}

export default App;

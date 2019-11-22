import React, { useState, useEffect, useCallback, useRef } from "react";
// 1、通过useRef创建一个对象；
// 2、将需要执行的定时任务储存在这个对象上；
// 3、将time作为第二个参数是为了当我们动态改变定时任务时，能过重新执行定时器。
export const useInterval = (callback, time = 300) => {
  const intervalFn = useRef({}); // 1
  useEffect(() => {
    intervalFn.current.fn = callback; // 2
  });
  useEffect(() => {
    intervalFn.current.timer = setInterval(() => {
      intervalFn.current.fn();
    }, time);
    return () => {
      clearInterval(intervalFn.current.timer);
    };
  }, []); // 3

  return intervalFn.current.timer;
};

//效果：通过 useInputValue() 拿到 Input 框当前用户输入的值，而不是手动监听 onChange 再腾一个 otherInputValue 和一个回调函数把这一堆逻辑写在无关的地方。
//这里要注意的是，我们对组件增强时，组件的回调一般不需要销毁监听，而且仅需监听一次，这与 DOM 监听不同，因此大部分场景，我们需要利用 useCallback 包裹，并传一个空数组，来保证永远只监听一次，而且不需要在组件销毁时注销这个 callback。
export const useInputValue = val => {
  let [value, setValue] = useState(val);
  let onChange = useCallback(function(event) {
    setValue(event.currentTarget.value);
  }, []);
  return {
    value,
    onChange
  };
};

//获取上一轮的props
export const usePreValue = val => {
  const ref = useRef();
  useEffect(() => {
    ref.current = val; //变更 .current 属性不会引发组件重新渲染
  });
  return ref.current;
};

export const useTitle = title => {
  useEffect(() => {
    document.title = title;
    return () => (document.title = "主页");
  }, [title]);
};

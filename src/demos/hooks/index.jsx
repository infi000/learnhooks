/**
 * 1.只能在函数组件中使用hooks
 * 2.函数组件业务变更无需修改成class组件
 * 3.告别了繁杂的this和难以记忆的生命周期
 * 4.合并的生命周期componentDidMount、componentDidUpdate、和 componentWillUnmount
 * 5.包装自己的hooks 是基于纯命令式的api
 * 6.更好的完成状态之间的共享 解决原来class组件内部封装问题。也解决了高阶组件和函数组件的嵌套过深
 * 7.useReducer集成redux
 * 8.useEffect接受脏操作等到react更新了DOM之后，它再依次执行我们定义的副作用函数。
 */
import React, { useState, useEffect } from "react";
import ComRules from "./ComRules";
import ComUseState from "./ComUseState";
import ComUseEffect from "./ComUseEffect";
import ComUseReducer from "./ComUseReducer";

export default () => {

  return (
    <>
      <ComRules />
      {/* <ComUseState /> */}
      {/* <ComUseEffect /> */}
      {/* <ComUseReducer /> */}
    </>
  );
};

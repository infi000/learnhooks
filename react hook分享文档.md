## 1 简介

**React Hooks 要解决的问题是状态共享**，称为 **状态逻辑复用**会更恰当，因为只共享数据处理逻辑，不会共享数据本身。

> 它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

意思很明了，就是拓展函数式组件的边界。结果也很清晰，只要 Class 组件能实现的，函数式组件 + Hooks都能胜任。



## 2 概述

### 2.1 Hook是什么

> Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。

何时使用hook?

> 如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class组件或者在项目中我们经常是用reducer来管理。现在你可以在现有的函数组件中使用 Hook。

规则有哪些？

- 只在最顶层使用 Hook
  - 不要在循环，条件，嵌套函数中调用Hook
  - 确保Hook在每次组件render时调用顺序都是一样的
- 不要在普通的 JavaScript 函数中调用 Hook
  - 在 React 的函数组件中调用 Hook
  - 在自定义的Hook中调用Hook

React Hooks 带来的好处不仅是 “更新粒度更细，代码更清晰”，还有如下三个特性：

1. 多个状态不会产生嵌套，写法还是平铺的。
2. Hooks 可以引用其他 Hooks。
3. 更容易将组件的 UI 与状态分离。

第二点展开说一下：Hooks 可以引用其他 Hooks，我们可以这么做：

```react
import { useState, useEffect } from "react";

// 底层 Hooks, 返回布尔值：是否在线
function useFriendStatusBoolean(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

// 上层 Hooks，根据在线状态返回字符串：Loading... or Online or Offline
function useFriendStatusString(props) {
  const isOnline = useFriendStatusBoolean(props.friend.id);

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}

// 使用了底层 Hooks 的 UI
function FriendListItem(props) {
  const isOnline = useFriendStatusBoolean(props.friend.id);

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</li>
  );
}

// 使用了上层 Hooks 的 UI
function FriendListStatus(props) {
  const status = useFriendStatusString(props);

  return <li>{status}</li>;
}
```

这个例子中，有两个 Hooks：`useFriendStatusBoolean` 与 `useFriendStatusString`, `useFriendStatusString` 是利用 `useFriendStatusBoolean` 生成的新 Hook，这两个 Hook 可以给不同的 UI：`FriendListItem`、`FriendListStatus` 使用，而因为两个 Hooks 数据是联动的，因此两个 UI 的状态也是联动的。

**“有状态的组件没有渲染，有渲染的组件没有状态”**：理想的情况

- `useFriendStatusBoolean` 与 `useFriendStatusString` 是有状态的组件（使用 `useState`），没有渲染（返回非 UI 的值），这样就可以作为 **Custom Hooks** 被任何 UI 组件调用。
- `FriendListItem` 与 `FriendListStatus` 是有渲染的组件（返回了 JSX），没有状态（没有使用 `useState`），这就是一个纯函数 UI 组件，

### 2.2 常用Hooks

#### 2.2.1 useState

> 可以让函数组件在生命周期中，有维护自己的数据和状态的功能。
>
> 区别与class组件：在class组件中，state 总是一个对象，可以在该对象上添加保存属性；对于 hooks，state 不必是对象，它可以是你想要的任何类型-数组、数字、布尔值、字符串等等。每次调用useState都会创建一个state块，其中包含一个值。

- useState 的参数有两种：
  1. 如果是函数，这是一种惰性初始 state，这个函数就只会在初始渲染时候调用，函数的返回值就是 state 的初始值。
  2. 如果是数据，直接作为 state 的初始值。

```react
const [test, setTest] = React.useState(0);

const [test, setTest] = React.useState(() => {
  return 123;
});
```

- setTest方法设置的test值，在下一次组件render中才能使用。
- setTest更新值的方式是全部覆盖式更新，这跟class组件的setState不一样。

```react
// 如果要更新单个值
const [test, setTest] = React.useState({ aa: 1, bb: 2 });
setTest({
  ...test,
  aa: 10,
})
```

1. 我应该使用单个还是多个 state 变量？

   > 把所有 state 都放在同一个 `useState` 调用中，或是每一个字段都对应一个 `useState` 调用，这两方式都能跑通。当你在这两个极端之间找到平衡，然后把相关 state 组合到几个独立的 state 变量时，组件就会更加的可读。

2. 可不可以不通过setState直接给state赋值？

   > "state" is read-only。
   >
   > 直接改变state的值会报错
   >
   > 修改复杂类型的state的属性，没有效果，组件不会从新渲染

3. 如何比较state?

   > React 使用 [`Object.is` 比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 来比较 state。
   >
   > 我们更新一个 state 变量，我们会 *替换* 它的值。这和 class 中的 `this.setState` 不一样，后者会把更新后的字段 *合并* 入对象中。



#### 2.2.1 useEffect

> 可以让我们在函数组件中执行副作用操作
>
> 当 React 渲染组件时，会保存已使用的 effect，并在更新完 DOM 后执行它。这个过程在每次渲染时都会发生，包括首次渲染。
>
> 虽然 `useEffect` 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 effect。
>
> 每次我们重新渲染，都会生成*新的* effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。
>
> 每一个组件内的函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获某次渲染中定义的props和state。



useEffect hook 就是执行组件副作用的钩子。`React.useEffect(callback, dependences)`

需要着重理解useEffect的执行时机。主要根据 dependences 的情况来区分：

1. dependences不传的时候，每次组件dom渲染结束后，都会走一遍这个useEffect；
2. dependences传空数组的时候，表示该useEffect不依赖任何变量，只有在组件第一次dom渲染后执行；
3. dependences传非空数组的时候，表示该useEffect依赖该数组中的元素变化，当组件dom渲染结束后，如果这些依赖项发生了改变的话，就要执行一次这个useEffect。

```react
useEffect(() => {
  console.log('dom挂载');
  return () => {
    console.log('dom卸载');
  }
}, [count]);
```

上述代码的执行结果是：

- 初始dom渲染后打印出 `dom挂载`
- count发生变化后，组件再次render时，先执行 `dom卸载`，再执行 `dom挂载`
- 以此类推下去

这个过程理解就可以说明：`为什么每次组件render都有自己的state和effect和事件`。



- 无需清楚的effect

- 需要清除的effect (定时器，绑定事件，订阅，防止内存泄漏)

  > 在class组件中，我们需要在`componentDidMount` 和 `componentWillUnmount`、`componentDidUpdate`中来写入绑定和清除的代码。业务逻辑分布在各个生命周期中难以维护且容器出错。useEffect可以在同一个地方执行绑定和清除的代码。可读性可维护性更强。只用在effect函数内部执行绑定方法，再return一个清除的方法即可。
  >
  > effect 在每次渲染的时候都会执行。这就是为什么 React *会*在执行当前 effect 之前对上一个 effect 进行清除。

1. 为什么要在组件内部调用useEffect?

   > 放在组件内部让我们可以在effec中直接访问state。它已经保存在函数作用域中。Hook使用了js的闭包机制。

2. 如果我的 effect 的依赖频繁变化，我该怎么办？

   > 某些时候我只想在函数组件挂载的时候运行它，但是在effect中却用到了组件内的state,props等变量。这时候就会引起某些bug。



#### 2.2.4 useContext

> useContext 接受上下文对象（从React.createContext返回的值）并返回当前上下文值。
>
> 当前的 `context` 值由上层组件中距离当前组件最近的 `<CountContext.Provider>` 的 `value` prop 决定。
>
> 当Context Provider的value发生变化是，他的所有子级消费者都会rerender。

#### 2.2.5 useReducer

> [`useState`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate) 的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。
>
>  state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。
>
> React 会确保 `dispatch` 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 `useEffect` 或 `useCallback` 的依赖列表中省略 `dispatch`。

- 指定初始化state

  > 将初始 state 作为第二个参数传入 `useReducer`

  ```react
  const [state, dispatch] = useReducer(
      reducer,
      {count: initialCount}
    );
  ```

- 惰性初始化

  > 需要将 `init` 函数作为 `useReducer` 的第三个参数传入，这样初始 state 将被设置为 `init(initialArg)`
  >
  > 这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利
  >
  > 局部状态不推荐使用 `useReducer` ，会导致函数内部状态过于复杂，难以阅读。 `useReducer` 建议在多组件间通信时，结合 `useContext` 一起使用。

1. 如何自己写一个useReducer

   ```react
   function useReducer(reducer, initialState) {
     const [state, setState] = useState(initialState);
   
     function dispatch(action) {
       const nextState = reducer(state, action);
       setState(nextState);
     }
   
     return [state, dispatch];
   }
   ```
   
   
   
2. 如何用useReducer创建一个redux

   > 真正实现一个 Redux 功能，也就是全局维持一个状态，任何组件 `useReducer` 都会访问到同一份数据，可以和useContext一起使用。
   >
   > 大体思路是利用 `useContext` 共享一份数据，作为 Custom Hooks 的数据源。将useReducer中获取state和dispatch当做参数传递给useContext

总结起来就是：

- 如果你的页面`state`很简单，可以直接使用`useState`
- 如果你的页面`state`比较复杂（state是一个对象或者state非常多散落在各处）请使用userReducer
- 如果你的页面组件层级比较深，并且需要子组件触发`state`的变化，可以考虑useReducer + useContext

#### 2.2.6 useCallback

> 返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 回调函数。
>
> 该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染
> useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
>
> 所有回调函数中引用的值都应该出现在依赖项数组中
>
> 推荐所有函数组件内函数的用 `React.useCallback` 包裹，以保证准确性与性能。推荐`useCallback` 第二个参数必须写

1.拿到onChange抛出的值

```react
export const useInputValue = val => {
  let [value, setValue] = useState(val);
  let onChange = useCallback(function(event) {
    setValue(event.currentTarget.value);
  }, []);//保证inputDom只绑定监听事件一次

  return {
    value,
    onChange
  };
};

```

>  效果：通过 useInputValue() 拿到 Input 框当前用户输入的值，而不是手动监听 onChange 再腾一个 otherInputValue 和一个回调函数把这一堆逻辑写在无关的地方。

#### 2.2.7 useMemo

> 返回一个memoized值 ` const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
> 你可以把 `useMemo` 作为一种性能优化的手段

两个参数依次是计算函数（通常是组件函数）和依赖状态列表，当依赖的状态发生改变时，才会触发计算函数的执行。如果没有指定依赖，则每一次渲染过程都会执行该计算函数。

前面我们说过了当状态发生变化时，没有设置关联状态的 useEffect 会全部执行。同样的，通过计算出来的值或者引入的组件也会重新计算/挂载一遍，即使与其关联的状态没有发生任何变化。 

在类组件中我们有 shouldComponetUpdate 以及 React.memo 帮助我们去做性能优化。所以在函数组件中就出现了useMemo。

`在业务中，我们可以用  useMemo  来处理计算结果的缓存或引入组件的防止重复挂载优化。`其接受两个参数，第一个参数为一个 Getter 方法，返回值为要缓存的数据或组件，第二个参数为该返回值相关联的状态，当其中任何一个状态发生变化时就会重新调用 Getter 方法生成新的返回值。

> 初次接受  useMemo  时可能我们会觉得该钩子只是用来做计算结果的缓存，返回值只能是一个数字或字符串。其实  useMemo  并不关心我们的返回值类型是什么，它只是在关联状态发生变动时重新调用我们传递的 Getter 方法 生成新的返回值，也就是说  `useMemo  生成的是 Getter 方法与依赖数组的关联关系`。因此，如果我们将函数的返回值替换为一个组件，那么就可以实现对组件挂载/重新挂载的性能优化。

#### 2.2.8 useRef

> useRef 返回一个**可变**的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

```react
const refContainer = useRef(initialValue);
```

>  `useRef()` 和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个 ref 对象。
>
> 当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。

useRef hook的作用：

  - 获取DOM元素的节点
  - 获取子组件的实例
  - 渲染周期之间共享数据的存储（state不能存储跨渲染周期的数据，因为state的保存会触发组件重渲染）

useRef之所以总能取到变量最新值的原因：它保存的变量不会随着每次数据的变化重新生成，所以相当于保存了一份该变量的引用，所以总能保持在最后一次赋值的状态。



## 3 特点

#### 优势

1. 让在函数组件中有可维护的状态和数据
2. 函数组件业务变更无需修改成class组件
3. 告别了繁杂的this和难以记忆的生命周期
4. 合并的生命周期componentDidMount、componentDidUpdate、和 componentWillUnmount
5. 更好的完成状态之间的共享.
6. 多个状态不会产生嵌套，写法还是平铺的，也解决了高阶组件和函数组件的嵌套过深
7. Hooks 可以引用其他 Hooks。
8. useReducer集成redux
9. useEffect接受脏操作等到react更新了DOM之后，它再依次执行我们定义的副作用函数。‘
10. 状态与UI的界限份的越来越清晰

#### 缺点

1. 有些hooks行为怪异很难理解。 useEffect最甚；有时候依赖和回调写的不注意就容易死循环。
2. 规矩很多（ 函数必须以 "use" 命名开头，顺序，不能在条件判断循环中声明等等)
3. 逻辑复杂的场景中或者系统的主要架构中用hook进行状态或者数据管理还是不太放心。
4. 社区好像更热衷于造轮子



#### 关于React副作用
有些同学可能会对「副作用」这个概念不理解。我简单的说一下我的看法。很多人都看过一个React公式

> UI = F(props)

翻译成普通话就是：一个组件最终的dom结构与样式是由父级传递的props决定的。

了解过函数式编程的同学，应该知道过一个概念，叫「纯函数」。意思是固定的输入必然有固定的输出，它不依赖任何外部因素，也不会对外部环境产生影响。

react希望自己的组件渲染也是个纯函数，所以有了纯函数组件。然而真正的业务场景是有各种状态的，实际影响UI的还有内部的state。(其实还有context，暂时先不讨论）。

UI = F(props, state, context)

这个state可能会因为各种原因产生变化，从而导致组件的渲染结果不一致。相同的入参（props）下，每次render都有可能返回不同的UI。因此任何导致此现象的行为都是副作用（side effects）。比如用户点击下一页，导致页码与列表发生变化，这就是副作用。同样的props，不点击时是第一页数据，点击一下后，变成了第二页的数据or请求失败的页面or其他UI交互。
当然state是明面上影响了UI，暗地里，可能还有其他因素会影响UI。比如组件内运用了缓存，导致每次渲染可能都不一样，这也是副作用。



## 4 总结

> 应该理性的选择，hook和现在的项目系统不冲突，现在也是模块化开发，可以从新的模块入手来尝试在模块内部用hook来处理数据和逻辑状态。
>
> 在一些简单的页面里，引入redux，saga那一套东西显得有些大材小用，而且开发起来也有些繁琐，使用hook会更灵活轻便一些。
>
> 我们也可以开发一些常用的hook，当老项目有新的功能完全可以用Hook去开发，如果对老的组件进行修改时就可以考虑给老组件上Hook，不建议一上来就进行大改。随着常用Hook组件库的丰富，后期改起来也会非常快。
>
> 在使用Hook时难免少不了一些常用的Hook，如果可以将这些常用的Hook封装起来。变成工具库。



## 5 参考资料

- [React Hooks 最佳实践](https://github.com/dt-fe/weekly/blob/v2/120.%E7%B2%BE%E8%AF%BB%E3%80%8AReact%20Hooks%20%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5%E3%80%8B.md)

- [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

- [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)

- [怎么用 React Hooks 造轮子](https://github.com/dt-fe/weekly/blob/v2/080.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md)BD%B3%E5%AE%9E%E8%B7%B5%E3%80%8B.md)

- [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

- [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)

- [怎么用 React Hooks 造轮子](https://github.com/dt-fe/weekly/blob/v2/080.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md)
# Hello World

这是一道非常简单的入门合约示例题目，你可以通过调用合约上的 `setAge(uint256)` 方法来修改 `age` 变量的值，然后通过调用 `isAdult()` 方法来判断 `age` 是否大于等于 18。
这里为了简单起见，你可以直接去验证 `isAdult`。

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Instance {
  uint256 public age = 25;

  function setAge(uint256 _age) public {
    age = _age;
  }

  function isAdult() public view returns (bool) {
    return age >= 18;
  }
}
```


（单选）下面哪一项不是 Solidity 中的函数可见性说明符？
* external
* private
* protected
* public

（多选）下面关于 pure 和 view 两个关键字的描述，哪一项是正确的?
☐ 每个函数在声明时必须包含这两个关键字中的一个
☐ 这两个关键字可以控制函数的权限
☐ 用户从外部调用包含这两个关键字的函数时不消耗 gas
☐ 其他编程语言中，一般不包含这两个关键字
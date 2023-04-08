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
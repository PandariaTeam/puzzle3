// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Instance {
  uint256 public age;

  function changeName(uint256 _age) public {
    age = _age;
  }

  function getResult() public pure returns (bool) {
    return true;
  }
}

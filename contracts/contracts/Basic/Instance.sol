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

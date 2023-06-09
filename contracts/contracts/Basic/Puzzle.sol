// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import '../BasePuzzle.sol';
import './Instance.sol';

contract Puzzle is BasePuzzle {
  constructor() BasePuzzle('Basic Puzzle') {}

  function createInstance(
    address _solver
  ) public payable override returns (address) {
    _solver;
    return address(new Instance());
  }

  function validateInstance(
    address payable _instance,
    address _solver
  ) public view override returns (bool) {
    _solver;
    Instance instance = Instance(_instance);
    return instance.isAdult();
  }
}

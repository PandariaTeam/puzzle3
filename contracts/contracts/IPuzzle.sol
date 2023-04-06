// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

interface IPuzzle is IERC721 {
  function puzzle3() external pure returns (address);

  function mint(address _solver) external;

  function createInstance(address _solver) external payable returns (address);

  function validateInstance(
    address payable _instance,
    address _solver
  ) external returns (bool);
}

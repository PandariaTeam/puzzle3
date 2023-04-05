// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./puzzles/base/Puzzle.sol";

abstract contract APuzzle3 is Ownable {
    /**
     * @notice A mapping of registered puzzles
     */
    mapping(address => bool) public registeredPuzzles;

    /**
     * Register puzzle
     * @param _puzzle The address of the puzzle to register
     */
    function registerPuzzle(Puzzle _puzzle) public virtual returns (bool);
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

abstract contract Puzzle is ERC721, Ownable {
    struct Question {
        string question;
        string[] options;
    }
    Question[] questions;

    function createInstance(
        address _solver
    ) public payable virtual returns (address);

    function validateInstance(
        address payable _instance,
        address _solver
    ) public virtual returns (bool);
}

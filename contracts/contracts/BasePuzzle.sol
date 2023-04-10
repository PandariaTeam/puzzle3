// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

abstract contract BasePuzzle is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  // Puzzle3 address
  address public constant puzzle3 = 0x1a86339ad7fBB50F753A0Eb44B0FdfD4BC931A44;

  constructor(
    string memory name_
  ) ERC721(string(abi.encodePacked('Puzzle3: ', name_)), name_) {}

  error OnlyPuzzle3();

  modifier onlyPuzzle3() {
    if (_msgSender() != puzzle3) {
      revert OnlyPuzzle3();
    }
    _;
  }

  function _baseURI()
    internal
    view
    virtual
    override(ERC721)
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          'https://service.puzzle3.cc/puzzles/',
          Strings.toHexString(uint160(address(this)), 20),
          '/'
        )
      );
  }

  function mint(address _solver) public onlyPuzzle3 {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(_solver, tokenId);
  }

  function createInstance(
    address _solver
  ) public payable virtual returns (address);

  function validateInstance(
    address payable _instance,
    address _solver
  ) public virtual returns (bool);
}

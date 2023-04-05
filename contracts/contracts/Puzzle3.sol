// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import '@openzeppelin/contracts/access/Ownable.sol';
import './IPuzzle.sol';

contract Puzzle3 is Ownable {
  // #region state variables

  // A mapping of registered puzzles address to creator address
  // mapping(puzzle_address => creator_address)
  mapping(address => address) public puzzles;

  // Mapping from puzzle address to puzzle available
  // mapping(puzzle_address => bool);
  mapping(address => bool) public puzzlesAvailable;

  struct PuzzleInstance {
    address solver;
    IPuzzle puzzle;
    bool completed;
  }

  // Mapping from puzzle instance address to puzzle instance data
  mapping(address => PuzzleInstance) public instances;

  // #endregion

  // #region events

  // Puzzle register event
  event PuzzleRegister(address indexed creator, address indexed puzzle);
  // Puzzle available change event
  event PuzzleAvailableChange(address indexed puzzleAddress, bool available);
  // Puzzle instance create event
  event PuzzleInstanceCreate(
    address indexed solver,
    address indexed instanceAddress,
    address indexed puzzleAddress
  );
  // Puzzle instance completed event
  event PuzzleInstanceCompleted(
    address indexed solver,
    address indexed instanceAddress,
    address indexed puzzleAddress
  );

  // #endregion

  // #region errors

  // Puzzle has been registered
  error PuzzleHasBeenRegistered(address puzzleAddress, address creator);
  // Puzzle not owned
  error PuzzleNotOwned(address puzzleAddress);
  // Puzzle not exists
  error PuzzleNotExists(address puzzleAddress);
  // Puzzle instance not exists
  error PuzzleInstanceNotExists(address instanceAddress);
  // Puzzle instance has been completed
  error PuzzleInstanceHasBeenCompleted(address instanceAddress);

  // #endregion

  /**
   * Only registered puzzle will be allowed to generate and validate instances.
   * @param _puzzle The address of the puzzle
   */
  function registerPuzzle(IPuzzle _puzzle) external {
    address creator = _msgSender();
    address puzzle = address(_puzzle);

    // Check if the puzzle has been registered
    if (puzzles[puzzle] != address(0)) {
      revert PuzzleHasBeenRegistered(puzzle, puzzles[puzzle]);
    }

    puzzles[puzzle] = creator;
    puzzlesAvailable[puzzle] = true;

    emit PuzzleRegister(creator, puzzle);
    // TODO: statistics.saveNewLevel(address(_puzzle));
  }

  /**
   * Change the puzzle available status, this method is idempotent.
   * @param _puzzle The address of the puzzle
   * @param available The available status
   */
  function changePuzzleAvailable(IPuzzle _puzzle, bool available) external {
    address sender = _msgSender();
    address puzzle = address(_puzzle);
    if (puzzles[puzzle] == address(0)) {
      revert PuzzleNotExists(puzzle);
    }
    if (puzzles[puzzle] != sender) {
      revert PuzzleNotOwned(puzzle);
    }
    puzzlesAvailable[puzzle] = available;
    emit PuzzleAvailableChange(puzzle, available);
  }

  /**
   * Create a new puzzle instance.
   */
  function createPuzzleInstance(IPuzzle _puzzle) public payable {
    address puzzle = address(_puzzle);
    address solver = _msgSender();

    // Ensure puzzle exists.
    if (puzzlesAvailable[puzzle] != true) {
      revert PuzzleNotExists(puzzle);
    }

    // Get puzzle to create an instance.
    address instance = _puzzle.createInstance{ value: msg.value }(solver);

    // Store instance relationship with solver and puzzle.
    instances[instance] = PuzzleInstance(solver, _puzzle, false);

    // statistics.createNewInstance(instance, address(_level), msg.sender);

    // Retrieve created instance via logs.
    emit PuzzleInstanceCreate(solver, instance, puzzle);
  }

  /**
   * Submit a puzzle instance.
   */
  function submitPuzzleInstance(address payable _instance) public {
    // Get solver and puzzle.
    PuzzleInstance storage instance = instances[_instance];
    address sender = _msgSender();

    if (instance.solver != sender) {
      revert PuzzleInstanceNotExists(_instance);
    }
    if (instance.completed == true) {
      revert PuzzleInstanceHasBeenCompleted(_instance);
    }

    // Have the level check the instance.
    if (instance.puzzle.validateInstance(_instance, sender)) {
      // Register instance as completed.
      instance.completed = true;

      // statistics.submitSuccess(_instance, address(data.level), msg.sender);
      // Notify success via logs.
      emit PuzzleInstanceCompleted(sender, _instance, address(instance.puzzle));
    } else {
      // statistics.submitFailure(_instance, address(data.level), msg.sender);
    }
  }
}

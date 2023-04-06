// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import '@openzeppelin/contracts/access/Ownable.sol';
import './APuzzle.sol';

contract Puzzle3 is Ownable {
  // #region state variables

  // Struct of Puzzle Factory
  struct PuzzleFactory {
    address puzzleAddress;
    // Puzzle creator address
    address creator;
    // Puzzle is available
    bool available;
    // Block time of puzzle registered
    uint256 registerAt;
    // Created instance count
    uint256 instanceCreatedCount;
    // Solved instance count
    uint256 instanceSolvedCount;
  }

  // Mapping from puzzle address to puzzle data
  mapping(address => PuzzleFactory) public puzzles;

  // creator_address => puzzle_address[]
  mapping(address => address[]) internal creatorOwnedPuzzles;

  struct PuzzleInstance {
    address instanceAddress;
    // Instance solver address
    address solver;
    // Block time of puzzle instance created
    uint256 createdAt;
    // Block time of puzzle instance completed
    uint256 completedAt;
    // Puzzle address of current instance
    APuzzle puzzle;
    // Is completed
    bool completed;
  }

  // Mapping from puzzle instance address to puzzle instance data
  mapping(address => PuzzleInstance) public instances;
  // puzzle_address => instance_address[]
  mapping(address => address[]) internal puzzleOwnedInstances;
  // solver_address => (puzzle_address => instance_address[])
  mapping(address => mapping(address => address[]))
    internal solverCreatedPuzzleInstances;

  // #endregion

  // #region events

  // Puzzle register event
  event PuzzleRegister(address indexed creator, address indexed puzzleAddress);
  // Puzzle available change event
  event PuzzleAvailableChange(address indexed puzzleAddress, bool available);
  // Puzzle instance create event
  event PuzzleInstanceCreate(
    address indexed solver,
    address indexed instanceAddress,
    address indexed puzzleAddress
  );
  // Puzzle instance completed event
  event PuzzleInstanceSubmit(
    address indexed solver,
    address indexed instanceAddress,
    address indexed puzzleAddress,
    bool completed
  );

  // #endregion

  // #region errors

  // Puzzle has been registered
  error PuzzleHasBeenRegistered(address puzzleAddress, address creator);
  // Puzzle is invalid
  error PuzzleInvalid(address puzzleAddress, address creator);
  // Puzzle not exists/owned
  error PuzzleNotExistsOrOwned(address puzzleAddress);
  // Puzzle instance not exists/owned
  error PuzzleInstanceNotExistsOrOwned(address instanceAddress);
  // Puzzle instance has been completed
  error PuzzleInstanceHasBeenCompleted(address instanceAddress);

  // #endregion

  /**
   * Only registered puzzle will be allowed to generate and validate instances.
   * @param _puzzle The address of the puzzle
   */
  function registerPuzzle(APuzzle _puzzle) external {
    address creator = _msgSender();
    address puzzleAddress = address(_puzzle);

    if (_puzzle.puzzle3() != address(this)) {
      revert PuzzleInvalid(puzzleAddress, creator);
    }

    // Check if the puzzle has been registered
    if (puzzles[puzzleAddress].creator != address(0)) {
      revert PuzzleHasBeenRegistered(
        puzzleAddress,
        puzzles[puzzleAddress].creator
      );
    }

    puzzles[puzzleAddress] = PuzzleFactory({
      puzzleAddress: puzzleAddress,
      creator: creator,
      available: true,
      registerAt: block.timestamp,
      instanceCreatedCount: 0,
      instanceSolvedCount: 0
    });
    creatorOwnedPuzzles[creator].push(puzzleAddress);

    emit PuzzleRegister(creator, puzzleAddress);
    // TODO: statistics.saveNewLevel(address(_puzzle));
  }

  /**
   * Change the puzzle available status, this method is idempotent.
   * @param _puzzle The address of the puzzle
   * @param available The available status
   */
  function changePuzzleAvailable(APuzzle _puzzle, bool available) external {
    address sender = _msgSender();
    address puzzleAddress = address(_puzzle);
    if (sender != owner() && puzzles[puzzleAddress].creator != sender) {
      revert PuzzleNotExistsOrOwned(puzzleAddress);
    }
    puzzles[puzzleAddress].available = available;
    emit PuzzleAvailableChange(puzzleAddress, available);
  }

  /**
   * Create a new puzzle instance.
   */
  function createPuzzleInstance(APuzzle _puzzle) public payable {
    address solver = _msgSender();
    address puzzleAddress = address(_puzzle);

    // Ensure puzzle exists and available
    if (puzzles[puzzleAddress].available != true) {
      revert PuzzleNotExistsOrOwned(puzzleAddress);
    }

    // Get puzzle to create an instance.
    address instanceAddress = _puzzle.createInstance{ value: msg.value }(
      solver
    );

    // Store instance relationship with solver and puzzle.
    instances[instanceAddress] = PuzzleInstance({
      instanceAddress: instanceAddress,
      solver: solver,
      createdAt: block.timestamp,
      completedAt: 0,
      puzzle: _puzzle,
      completed: false
    });
    solverCreatedPuzzleInstances[solver][puzzleAddress].push(instanceAddress);
    puzzles[puzzleAddress].instanceCreatedCount += 1;
    puzzleOwnedInstances[puzzleAddress].push(instanceAddress);

    // TOOD: statistics.createNewInstance(instance, address(_level), msg.sender);

    // Retrieve created instance via logs.
    emit PuzzleInstanceCreate(solver, instanceAddress, puzzleAddress);
  }

  /**
   * Submit a puzzle instance.
   */
  function submitPuzzleInstance(address payable _instance) public {
    address solver = _msgSender();
    // Get solver and puzzle.
    PuzzleInstance storage instance = instances[_instance];

    if (instance.solver != solver) {
      revert PuzzleInstanceNotExistsOrOwned(_instance);
    }
    if (instance.completed == true) {
      revert PuzzleInstanceHasBeenCompleted(_instance);
    }

    // Have the puzzle check the instance.
    if (instance.puzzle.validateInstance(_instance, solver)) {
      // Register instance as completed.
      instance.completed = true;
      instance.completedAt = block.timestamp;
      instance.puzzle.mint(solver);
      puzzles[address(instance.puzzle)].instanceSolvedCount += 1;

      // statistics.submitSuccess(_instance, address(data.level), msg.sender);
      // Notify success via logs.
      emit PuzzleInstanceSubmit(
        solver,
        _instance,
        address(instance.puzzle),
        true
      );
    } else {
      emit PuzzleInstanceSubmit(
        solver,
        _instance,
        address(instance.puzzle),
        false
      );
      // statistics.submitFailure(_instance, address(data.level), msg.sender);
    }
  }

  // Get puzzles by creator address
  function getPuzzlesByCreator(
    address _creator
  ) public view returns (PuzzleFactory[] memory) {
    address[] memory createdPuzzleAddressList = creatorOwnedPuzzles[_creator];
    PuzzleFactory[] memory createdPuzzles = new PuzzleFactory[](
      createdPuzzleAddressList.length
    );
    if (createdPuzzleAddressList.length <= 0) {
      return createdPuzzles;
    }
    for (uint i = 0; i < createdPuzzleAddressList.length; i += 1) {
      createdPuzzles[i] = puzzles[createdPuzzleAddressList[i]];
    }
    return createdPuzzles;
  }

  // Get puzzle instances by puzzle address
  function getPuzzleInstancesByPuzzleAddress(
    address _puzzleAddress
  ) public view returns (PuzzleInstance[] memory) {
    if (puzzles[_puzzleAddress].creator == address(0)) {
      revert PuzzleNotExistsOrOwned(_puzzleAddress);
    }
    address[] memory createdPuzzleInstanceAddressList = puzzleOwnedInstances[
      _puzzleAddress
    ];

    PuzzleInstance[] memory createdInstances = new PuzzleInstance[](
      createdPuzzleInstanceAddressList.length
    );

    for (uint i = 0; i < createdPuzzleInstanceAddressList.length; i += 1) {
      createdInstances[i] = instances[createdPuzzleInstanceAddressList[i]];
    }

    return createdInstances;
  }
}

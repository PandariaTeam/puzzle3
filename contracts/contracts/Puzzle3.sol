// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//  ________  ___  ___  ________  ________  ___       _______  ________
// |\   __  \|\  \|\  \|\_____  \|\_____  \|\  \     |\  ___ \|\_____  \
// \ \  \|\  \ \  \\\  \\|___/  /|\|___/  /\ \  \    \ \   __/\|____|\ /_
//  \ \   ____\ \  \\\  \   /  / /    /  / /\ \  \    \ \  \_|/__   \|\  \
//   \ \  \___|\ \  \\\  \ /  /_/__  /  /_/__\ \  \____\ \  \_|\ \ __\_\  \
//    \ \__\    \ \_______\\________\\________\ \_______\ \_______\\_______\
//     \|__|     \|_______|\|_______|\|_______|\|_______|\|_______\|_______|

import '@openzeppelin/contracts/access/Ownable.sol';
import './BasePuzzle.sol';

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
    // Hash(answers)
    // bytes32 answer;
  }

  // Mapping from puzzle address to puzzle data
  mapping(address => PuzzleFactory) public puzzles;

  // creator_address => puzzle_address[]
  mapping(address => address[]) internal creatorOwnedPuzzles;

  address[] internal totalPuzzleList;

  struct PuzzleInstance {
    address instanceAddress;
    // Instance solver address
    address solver;
    // Block time of puzzle instance created
    uint256 createdAt;
    // Block time of puzzle instance completed
    uint256 completedAt;
    // Puzzle address of current instance
    BasePuzzle puzzle;
    // Is completed
    bool completed;
    // bytes32 answer;
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
  error PuzzleInstanceSubmitQuestionsWrong();
  error PuzzleInstanceSubmitContractWrong();

  // #endregion

  /**
   * Only registered puzzle will be allowed to generate and validate instances.
   * @param _puzzle The address of the puzzle
   */
  function registerPuzzle(BasePuzzle _puzzle /*, bytes32 answer*/) external {
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
      // answer: answer
    });
    totalPuzzleList.push(puzzleAddress);
    creatorOwnedPuzzles[creator].push(puzzleAddress);

    emit PuzzleRegister(creator, puzzleAddress);
    // TODO: statistics.saveNewLevel(address(_puzzle));
  }

  /**
   * Change the puzzle available status, this method is idempotent.
   * @param _puzzle The address of the puzzle
   * @param available The available status
   */
  function changePuzzleAvailable(BasePuzzle _puzzle, bool available) external {
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
  function createPuzzleInstance(
    BasePuzzle _puzzle
  ) public payable returns (address) {
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

    // bytes32 answer = keccak256(abi.encodePacked(puzzles[puzzleAddress].answer));
    // string memory answer = puzzles[puzzleAddress].answer;

    // Store instance relationship with solver and puzzle.
    instances[instanceAddress] = PuzzleInstance({
      instanceAddress: instanceAddress,
      solver: solver,
      createdAt: block.timestamp,
      completedAt: 0,
      puzzle: _puzzle,
      completed: false
      // answer: puzzles[puzzleAddress].answer
    });
    solverCreatedPuzzleInstances[solver][puzzleAddress].push(instanceAddress);
    puzzles[puzzleAddress].instanceCreatedCount += 1;
    puzzleOwnedInstances[puzzleAddress].push(instanceAddress);

    // TOOD: statistics.createNewInstance(instance, address(_level), msg.sender);

    // Retrieve created instance via logs.
    emit PuzzleInstanceCreate(solver, instanceAddress, puzzleAddress);

    return instanceAddress;
  }

  /**
   * Submit a puzzle instance.
   */
  function submitPuzzleInstance(
    address payable _instance // , bytes32 answer
  ) public {
    address solver = _msgSender();
    // Get solver and puzzle.
    PuzzleInstance memory instance = instances[_instance];

    if (instance.solver != solver) {
      revert PuzzleInstanceNotExistsOrOwned(_instance);
    }
    if (instance.completed == true) {
      revert PuzzleInstanceHasBeenCompleted(_instance);
    }

    address puzzleAddress = address(instance.puzzle);
    // bytes32 targetAnswer = keccak256(abi.encodePacked(answer));

    // if (answer != instance.answer) {
    //   emit PuzzleInstanceSubmit(solver, _instance, puzzleAddress, false);
    //   revert PuzzleInstanceSubmitQuestionsWrong();
    // } else
    if (instance.puzzle.validateInstance(_instance, solver) != true) {
      emit PuzzleInstanceSubmit(solver, _instance, puzzleAddress, false);
      revert PuzzleInstanceSubmitContractWrong();
    } else {
      // Register instance as completed.
      instance.completed = true;
      instance.completedAt = block.timestamp;
      puzzles[puzzleAddress].instanceSolvedCount += 1;
      instance.puzzle.mint(solver);

      // statistics.submitSuccess(_instance, address(data.level), msg.sender);
      // Notify success via logs.
      emit PuzzleInstanceSubmit(solver, _instance, puzzleAddress, true);
    }
  }

  // Get puzzles by creator address
  function getPuzzlesByCreator(
    address _creator
  ) public view returns (address[] memory) {
    return creatorOwnedPuzzles[_creator];
  }

  // Get puzzle instances by puzzle address
  function getPuzzleInstancesByPuzzleAddress(
    address _puzzleAddress
  ) public view returns (address[] memory) {
    if (puzzles[_puzzleAddress].creator == address(0)) {
      revert PuzzleNotExistsOrOwned(_puzzleAddress);
    }
    return puzzleOwnedInstances[_puzzleAddress];
  }

  function getTotalPuzzleList() public view returns (address[] memory) {
    return totalPuzzleList;
  }
}

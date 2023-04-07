# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

### PuzzleFactory

```sol
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
  bytes32 answer;
}
```

### PuzzleInstance

```sol
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
  bytes32 answer;
}
```

### Methods

```
contract.puzzles(puzzleAddress) => PuzzleFactory // 获取 puzzle 信息（除了 metadata 外的信息）
contract.totalPuzzleList() => address[] // 获取全部 puzzle address list
contract.getPuzzlesByCreator(creatorAddress) => address[] // 获取某一个作者的所有 Puzzle
contract.registerPuzzle(puzzleAddress, answerHash) => void // 注册 Puzzle，answerHash 为 bytes32 类型
contract.createPuzzleInstance(puzzleAddress) => instanceAddress // 生成某一个 Puzzle 的实例，返回实例地址
contract.submitPuzzleInstance(instanceAddress, answerHash) => void // 提交某个实例
```
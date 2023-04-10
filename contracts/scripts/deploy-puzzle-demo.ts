import * as hardhat from 'hardhat';

const sleep = async (ts: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ts);
  });

async function main() {
  const TestPuzzle = await hardhat.ethers.getContractFactory('PuzzleDemo');
  const testPuzzle = await TestPuzzle.deploy();

  await testPuzzle.deployed();
  console.log(`Puzzle contract deployed to ${testPuzzle.address}`);

  await sleep(10000);

  await hardhat.run('verify', {
    address: testPuzzle.address, // '0x7d4741D2C7a9BcB9dA9e9D29d12a8feB115f00cB',
    constructorArgsParams: [],
    contract: 'contracts/Demo/Puzzle.sol:PuzzleDemo',
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// hardhat verify --network sepolia {address} {arg1} {arg2}
// hardhat run scripts/deploy.ts --network sepolia

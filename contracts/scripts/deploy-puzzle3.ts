import * as hardhat from 'hardhat';

const sleep = async (ts: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ts);
  });

async function main() {
  const Puzzle3 = await hardhat.ethers.getContractFactory('Puzzle3');
  const puzzle3 = await Puzzle3.deploy();

  await puzzle3.deployed();
  console.log(`Puzzle3 contract deployed to ${puzzle3.address}`);

  await sleep(5000);

  await hardhat.run('verify', {
    address: puzzle3.address,
    constructorArgsParams: [],
    contract: 'contracts/Puzzle3.sol:Puzzle3',
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

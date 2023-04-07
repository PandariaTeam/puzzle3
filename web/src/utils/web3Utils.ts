// import { ethers } from 'ethers';
import * as ethers from 'ethers';
import { abi } from './abi';

export const chainId = '0xaa36a7';
export const readContractData = async (payload: any) => {
  // const { web3Ref, contractAddress, contractABI, method, args } = payload;
  // const contractWETH = new ethers.Contract(contractAddress, contractABI, wallet)
  // const contract = new web3Ref.Contract(contractABI, contractAddress);
  // const result = await contract.methods[method](...args).call();
  // return result;
  const { web3Ref, contractAddress, contractABI } = payload;
  const signer = web3Ref.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const res = await contract.getPuzzlesByCreator(
    '0xffff08F4369503a779C74890C7bA5F94cb52fbbB'
  );
  console.log(res);
};

export const getVestingContract = async (w3: any) => {
  const contractAddress = '0x7784138c93A029210fF263D5ad6648a27631622d';
  // const result = await readContractData(w3, contractAddress, abi, 'vestingContract', [])
  const result = await readContractData({
    web3Ref: w3,
    contractAddress,
    contractABI: abi,
    method: 'puzzles',
    args: ['0xF0D675d78820D28b89CF457955D2aA595dD799e0']
  });
  return result;
};

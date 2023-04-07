import * as ethers from 'ethers';
import { abi } from './abi';

export const chainId = '0xaa36a7';
export const contractAddress = '0xb0a14E64E6a74A397fbaA94cC700158Bf655BD99';
export const readContractData = async (payload: any) => {
  const { web3Ref, contractABI, method } = payload;
  const signer = web3Ref.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const res = await contract[method]();
  console.log(res);
};

export const getPuzzleByCreater = async (w3: any) => {
  const result = await readContractData({
    web3Ref: w3,
    contractABI: abi,
    method: 'getPuzzlesByCreator'
  });
  return result;
};

export const getTotalList = async (w3: any) => {
  const result = await readContractData({
    web3Ref: w3,
    contractABI: abi,
    method: 'getTotalPuzzleList'
  });
  return result;
};

export const registerPuzzle = async (w3: any) => {
  const result = await readContractData({
    web3Ref: w3,
    contractABI: abi,
    method: 'registerPuzzle'
  });
  return result;
};

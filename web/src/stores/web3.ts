import * as ethers from 'ethers';
import { makeAutoObservable, flow } from 'mobx';
import { message } from 'antd';
import { fetchPuzzleList } from '@/services/api';
import { chainId, contractAddress } from '@/utils/web3Utils';
import { abi } from '@/utils/abi';

export class Web3Store {
  chainId = '';
  selectedAddress = '';
  createLoading = false;
  w3: any = null;

  puzzleList = [];

  constructor() {
    makeAutoObservable(this);
  }
  connect = (res: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (res?.chainId !== chainId) {
      this.connectChain();
    } else {
      this.chainId = res?.chainId;
    }
    this.selectedAddress = res?.selectedAddress;
    this.w3 = provider;
  };

  connectToMetaMask = flow(function* (this: Web3Store) {
    try {
      const eth = window.ethereum;
      if (!eth) {
        message.warning('Please install metamask to use the website');
        return;
      }
      if (eth.selectedAddress === null) {
        yield eth.enable();
        this.connect(eth);
      } else if (eth.isConnected()) {
        this.connect(eth);
      }
    } catch (error) {
      console.log('err', error);
    }
  });

  connectChain = flow(function* (this: Web3Store) {
    try {
      const eth = window.ethereum;
      if (!eth) {
        message.warning('请在网站中安装metamask');
        return;
      }
      yield eth.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      });
      this.chainId = chainId;
    } catch (error) {
      message.warning('请切换到相应的chainId');
    }
  });
  register = flow(function* (this: Web3Store, puzzleAddress: string) {
    const signer = this.w3.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    yield contract.registerPuzzle(puzzleAddress);
  });

  getTotalList = flow(function* (this: Web3Store) {
    try {
      const signer = this.w3.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const puzzleAddressList: [] = yield contract.getTotalPuzzleList();
      const res = yield fetchPuzzleList({
        puzzleAddressList
      });
      this.puzzleList = res?.list ?? [];
    } catch (error) {
      message.warning('该合约不符合Puzzle3的要求');
    }
  });
  createInstance = flow(function* (this: Web3Store, puzzleAddress: string) {
    try {
      const signer = this.w3.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      this.createLoading = true;
      const tx: any = yield contract.createPuzzleInstance(puzzleAddress);
      const res = yield tx.wait();
      this.createLoading = false;
      return res?.events[0]?.args[1] ?? '';
    } catch (error) {
      message.warning('该合约不符合Puzzle3的要求');
    }
  });
  submitInstance = flow(function* (this: Web3Store, instanceAddress?: string) {
    try {
      if (!instanceAddress) return;
      const signer = this.w3.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const res = yield contract.submitPuzzleInstance(instanceAddress);
      console.log('res', res);
    } catch (error) {
      message.warning('该合约不符合Puzzle3的要求');
    }
  });
}

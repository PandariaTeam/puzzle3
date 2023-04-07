import * as ethers from 'ethers';
import { makeAutoObservable, flow } from 'mobx';
import { message } from 'antd';
import { getPuzzleByCreater, chainId, getTotalList } from '@/utils/web3Utils';

export class Web3Store {
  chainId = '';
  selectedAddress = '';
  w3: any = null;

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

  test = () => {
    getTotalList(this.w3);
  };
}

import { ethers } from 'ethers';
import { contractAddress } from './web3Utils';

export class Puzzle3 {
  private readonly _puzzle3Address: string = contractAddress;

  constructor(
    private readonly _puzzleAddress: string,
    private readonly _instanceAddress: string
  ) {
    (window as any).ethers = ethers;
    (window as any).help = () => this.help();
  }

  public help() {
    const tips = {
      'puzzle3.solver': '当前玩家地址',
      'puzzle3.address': '主游戏合约',
      'puzzle3.puzzleAddress': '当前关卡合约地址',
      'puzzle3.instanceAddress': '当前关卡合约实例地址 (如果已创建)',
      'puzzle3.version': '当前游戏版本',
      'puzzle3.getBalance(address)': '获知地址可用ether数',
      'puzzle3.getMethodSignature(string, string[], string[])':
        '获取实例方法签名，比如：getMethodSignature("setAge", ["uint256"], [24])',
      'puzzle3.callInstance(txData: string, txRaw)':
        '调用实例合约上的方法，txData 可由 getMethodSignature 生成，比如：callInstance("0xfffffff")',
      'puzzle3.sendTransaction({ ...txRaw })': '发送交易',
      'puzzle3.getNetworkId()': '获得以太网id',
      'puzzle3.toWei(ether)': '从ether转换到wei',
      'puzzle3.fromWei(wei)': '从wei转换到ether'
    };

    console.table(tips);
  }

  get solver() {
    return window.ethereum?.selectedAddress;
  }
  get address() {
    return this._puzzle3Address;
  }
  get puzzleAddress() {
    return this._puzzleAddress;
  }
  get instanceAddress() {
    return this._instanceAddress;
  }
  get version() {
    return 1;
  }

  async getBalance(addr: string) {
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [addr, 'latest']
    });

    return ethers.utils.formatEther(BigInt(balance));
  }

  getMethodSignature(method: string, sig: string, values: string[]) {
    const c = new ethers.utils.Interface([sig]);
    return c.encodeFunctionData(method, values);
  }

  async callInstance(data: string, raw: any) {
    return this.sendTransaction({
      ...raw,
      from: this.solver,
      to: this.instanceAddress,
      data
    });
  }

  async sendTransaction(raw: any) {
    const tx = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [raw]
    });
    console.log(
      'See tx in etherscan:',
      `https://sepolia.etherscan.io/tx/${tx}`
    );
    return tx;
  }

  getNetworkId() {
    return window.ethereum.chainId;
  }

  fromWei(wei: ethers.BigNumberish) {
    return ethers.utils.formatEther(wei);
  }
  toWei(ether: ethers.BigNumberish) {
    return ethers.utils.parseUnits(String(ether), 'ether');
  }
}

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { ACCOUNT_PRIVATE_KEY, INFURA_API_KEY, ETHERSCAN_API_KEY } from './env';

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    scrollAlpha: {
      url: 'https://alpha-rpc.scroll.io/l2',
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;

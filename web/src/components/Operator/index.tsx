import { useEffect } from 'react';
import { useStore } from '@/context';

function HeaderOperator() {
  const {
    rootStore: { web3Store }
  } = useStore();
  useEffect(() => {
    web3Store.connectToMetaMask();
  }, []);

  return <p onClick={() => web3Store.connectToMetaMask()}>连接钱包</p>;
}

export default HeaderOperator;

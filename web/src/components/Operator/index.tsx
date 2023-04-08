import { useEffect } from 'react';
import { Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/context';

const { Text } = Typography;
function HeaderOperator() {
  const {
    rootStore: { web3Store }
  } = useStore();
  useEffect(() => {
    web3Store.connectToMetaMask();
  }, []);

  return (
    <Text
      style={{ width: 200 }}
      ellipsis={{
        tooltip: `${window.ethereum.selectedAddress}`
      }}
      onClick={() => web3Store.connectToMetaMask()}
    >
      {web3Store.selectedAddress ? web3Store.selectedAddress : '连接钱包'}
    </Text>
  );
}

export default observer(HeaderOperator);

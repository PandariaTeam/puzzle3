import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '@/context';

function Home() {
  const {
    rootStore: { web3Store }
  } = useStore();
  useEffect(() => {
    web3Store.connectToMetaMask();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to='/user'>User1</Link>
      <Link to='/creater'>Creater</Link>
    </div>
  );
}

export default observer(Home);

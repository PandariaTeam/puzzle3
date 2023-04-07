import { useEffect } from 'react';
import logo from '@/logo.svg';
import { useStore } from '@/context';
import { headerCls } from './style';
import { ProPageHeader } from '@ant-design/pro-components';

function Header() {
  const {
    rootStore: { web3Store }
  } = useStore();
  useEffect(() => {
    web3Store.connectToMetaMask();
  }, []);

  return (
    <header className={headerCls}>
      <img src={logo} className={`${headerCls}-logo`} alt='logo' />
    </header>
  );
}

export default Header;

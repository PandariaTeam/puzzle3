import logo from '@/logo.svg';
import { headerCls } from './style';
import { ProPageHeader } from '@ant-design/pro-components';

function Header() {

  return (
    <header className={headerCls}>
      <img src={logo} className={`${headerCls}-logo`} alt='logo' />
    </header>
  );
}

export default Header;

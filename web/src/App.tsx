import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderOperator from '@/components/Operator';
import Home from './pages/home';
import User from './pages/user';
import Creater from './pages/creater';
import { DefaultFooter, ProLayout } from '@ant-design/pro-components';

function App() {
  return (
    <ProLayout
      logo={
        <Image
          onClick={() => window.open('https://www.puzzle3.cc/')}
          width={32}
          preview={false}
          src='https://i.328888.xyz/2023/04/06/iNZt3L.png'
        />
      }
      title='Puzzle3'
      layout='top'
      actionsRender={() => {
        return [<HeaderOperator />];
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/:id/:instanceId' element={<User />} />
          <Route path='/creater' element={<Creater />} />
        </Routes>
      </BrowserRouter>

      <DefaultFooter
        copyright=' 2023 PandariaTeam - Puzzle3'
        links={[
          {
            key: 'ETH Beijing',
            title: 'ETHBeijing',
            href: 'https://ethbeijing.xyz',
            blankTarget: true
          },
          {
            key: 'github',
            title: 'GitHub',
            href: 'https://github.com/PandariaTeam/puzzle3',
            blankTarget: true
          }
        ]}
      />
    </ProLayout>
  );
}

export default observer(App);

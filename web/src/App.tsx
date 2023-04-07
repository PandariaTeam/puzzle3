import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/context';
import Header from './components/Header';
import Home from './pages/home';
import User from './pages/user';
import Creater from './pages/creater';

function App() {
  const {
    rootStore: { web3Store }
  } = useStore();
  useEffect(() => {
    web3Store.connectToMetaMask();
  }, []);
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/creater' element={<Creater />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);

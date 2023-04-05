import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from './context';
import logo from './logo.svg';
import './App.css';

function App() {
  const {
    rootStore: { userStore }
  } = useStore();
  React.useEffect(() => {
    console.log(userStore.name);
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p onClick={() => userStore.changeName()}>{userStore.name}</p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default observer(App);

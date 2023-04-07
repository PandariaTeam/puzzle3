import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useStore } from '@/context';
import PuzzleForm from '@/components/Form';
import { userCls } from './style';

function User() {
  const {
    rootStore: { userStore }
  } = useStore();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    userStore.getInfo(id);
  }, []);
  const onSubmit = () => userStore.create();
  return (
    <div className={userCls}>
      <PuzzleForm preview={false} />
      <p onClick={() => userStore.changeName()}>{userStore.name}</p>
      <Button onClick={onSubmit}>测试</Button>
    </div>
  );
}

export default observer(User);

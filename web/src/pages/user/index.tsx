import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useStore } from '@/context';

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
    <div>
      <p onClick={() => userStore.changeName()}>{userStore.name}</p>
      <Button onClick={onSubmit}>提交</Button>
    </div>
  );
}

export default observer(User);

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/context';
import { getMetaDataById } from '@/services/api';

function User() {
  const {
    rootStore: { userStore }
  } = useStore();
  useEffect(() => {
    getMetaDataById('2597505e-4e89-4737-98a4-fa3368359a4d');
  }, []);
  return (
    <div>
      <p onClick={() => userStore.changeName()}>{userStore.name}</p>
    </div>
  );
}

export default observer(User);

import { observer } from 'mobx-react-lite';
import { useStore } from '../../context';

function User() {
  const {
    rootStore: { userStore }
  } = useStore();
  return (
    <div>
      <p onClick={() => userStore.changeName()}>{userStore.name}</p>
    </div>
  );
}

export default observer(User);

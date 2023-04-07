import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/context';
import PuzzleForm from '@/components/Form';
import { userCls } from './style';

function User() {
  const {
    rootStore: { formStore }
  } = useStore();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    formStore.getInfo(id);
  }, []);
  return (
    <div className={userCls}>
      <PuzzleForm preview />
    </div>
  );
}

export default observer(User);

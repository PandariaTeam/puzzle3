import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/context';
import PuzzleForm from '@/components/Form';
import { userCls } from './style';
import { Puzzle3 } from '../../utils/puzzle3';

function User() {
  const {
    rootStore: { formStore }
  } = useStore();
  const { id, instanceId } = useParams();
  const [puzzleAddress, instanceAddress] = [id, instanceId];
  console.log(puzzleAddress, instanceAddress);
  useEffect(() => {
    (window as any).puzzle3 = new Puzzle3(puzzleAddress!, instanceAddress!);
    return () => {
      (window as any).puzzle3 = undefined;
    };
  }, [puzzleAddress, instanceAddress]);
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

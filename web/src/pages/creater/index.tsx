import { observer } from 'mobx-react-lite';

import PuzzleForm from '@/components/Form';
import { createrCls } from './style';

function Creater() {
  return (
    <div className={createrCls}>
      <PuzzleForm preview={false} />
    </div>
  );
}

export default observer(Creater);

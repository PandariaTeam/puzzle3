import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to='/user'>User1</Link>
      <Link to='/creater'>Creater</Link>
    </div>
  );
}

export default observer(Home);

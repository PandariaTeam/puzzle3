import { useEffect, useState } from 'react';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/context';
import { Button, Tabs, message, theme } from 'antd';
import { css } from '@emotion/css';
import { PlusCircleOutlined } from '@ant-design/icons';
import { PuzzleList } from './PuzzleList';
import { Puzzle3Difficulty } from '@puzzle3/types';

const total = [
  {
    puzzleAddress: '0xffff08F4369503a779C74890C7bA5F94cb52fbb1',
    metadata: {
      name: 'HelloWorld',
      author: '0xffff08F4369503a779C74890C7bA5F94cb52fbbB',
      created: 1680868822,
      difficulty: Puzzle3Difficulty.Easy,
      description: `我是很长的描述我是很长的描述我是很长的描述我是很长的描述我是很长的描述
      我是很长的描述我是很长的描述我是很长的描述我是很长的描述
      我是很长的描述我是很长的描述
      我是很长的描述我是很长的描述我是很长的描述我是很长的描述我是很长的描述我是很长的描述我是很长的描述`,
      completedDescription: '',
      contract: '',
      deployParams: [],
      formSchema: {}
    }
  },
  {
    puzzleAddress: '0xffff08F4369503a779C74890C7bA5F94cb52fbb2',
    metadata: {
      name: 'HelloWorld2',
      author: '0xffff08F4369503a779C74890C7bA5F94cb52fbbB3',
      created: 1680868823,
      difficulty: Puzzle3Difficulty.Medium,
      description: `我是很长的描述我是很长的描述我是很长的描述我是很长的描述我是很长的描述
      我是很长的描述我是很长的描述我是很长的描述我是很长的描述
      我是很长的描述我是很长的描述
      我是很长的描述我是很长的描述我是很长的描述我是很长的描述我是很长的描述我是很长的描述我是很长的描述`,
      completedDescription: '',
      contract: '',
      deployParams: [],
      formSchema: {}
    }
  }
];

function Home() {
  const {
    rootStore: { web3Store, userStore }
  } = useStore();
  useEffect(() => {
    web3Store.connectToMetaMask();
    web3Store.test();
    userStore.getPuzzleList();
  }, []);

  const { token } = theme.useToken();
  const [tab, setTab] = useState<string>('total');
  const history = useNavigate();

  return (
    <PageContainer
      // ghost
      pageHeaderRender={() => (
        <div
          className={css`
            height: 600px;
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            background-color: ${token.colorBgBase};
          `}
        >
          <div
            className={css`
              height: 100px;
              width: 800px;
              display: flex;
              flex-flow: column;
              align-items: center;
              justify-content: center;
              font-size: 72px;
              font-weight: 800;
            `}
          >
            <span>
              Create{' '}
              <span
                className={css`
                  color: ${token.colorPrimaryText};
                  position: relative;
                `}
              >
                Web3 Puzzle
                <svg
                  aria-hidden='true'
                  viewBox='0 0 418 42'
                  // className='absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70'
                  preserveAspectRatio='none'
                  className={css`
                    fill: ${token.colorPrimary};
                    width: 440px;
                    bottom: -10px;
                    position: absolute;
                    left: 0;
                    opacity: 0.4;
                  `}
                >
                  <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z'></path>
                </svg>
              </span>
            </span>
            <span
              className={css`
                font-weight: 600;
              `}
            >
              in seconds
            </span>
          </div>
          <div
            className={css`
              margin-top: 60px;
            `}
          >
            Puzzle3 是一款通过智能合约交互实现的链上解谜、答题平台。 让 Web3
            学习平台、区块链初创团队用户能够通过更直接、简洁、有趣的方式了解各自团队的产品
          </div>

          <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            size='large'
            shape='round'
            className={css`
              margin-top: 40px;
            `}
            onClick={() => {
              if (!window.ethereum?.selectedAddress) {
                message.error('请先链接 MetaMask 钱包');
              } else {
                history('/creater');
              }
            }}
          >
            创建 Puzzle
          </Button>
        </div>
      )}
    >
      {window.ethereum?.selectedAddress ? (
        <>
          <Tabs
            activeKey={tab}
            onChange={setTab}
            centered
            items={[
              {
                key: 'total',
                label: '全部'
              },
              {
                key: 'owned',
                label: '我创建的'
              }
            ]}
          />
          <PuzzleList
            list={tab === 'total' ? total : []}
            onClickSolve={console.log}
          />
        </>
      ) : null}
    </PageContainer>
  );
}

export default observer(Home);

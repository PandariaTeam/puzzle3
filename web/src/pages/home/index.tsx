import { useEffect } from 'react';
import { ProList } from '@ant-design/pro-components';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '@/context';
import { Button, Space, Tag } from 'antd';

const dataSource = [
  {
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述'
  },
  {
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述'
  },
  {
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述'
  },
  {
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述'
  }
];

function Home() {
  const {
    rootStore: { web3Store }
  } = useStore();
  useEffect(() => {
    web3Store.getTotalList();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to='/user'>User1</Link>
      <Link to='/creater'>Creater</Link>
      <ProList<any>
        onRow={(record: any) => {
          return {
            onClick: () => {
              console.log(record);
            }
          };
        }}
        rowKey='name'
        headerTitle='Puzzle3答题列表'
        tooltip='点击去答题'
        dataSource={dataSource}
        showActions='hover'
        showExtra='hover'
        metas={{
          title: {
            dataIndex: 'name'
          },
          avatar: {
            dataIndex: 'image'
          },
          description: {
            dataIndex: 'desc'
          },
          subTitle: {
            render: () => {
              return (
                <Space size={0}>
                  <Tag color='blue'>Ant Design</Tag>
                  <Tag color='#5BD8A6'>TechUI</Tag>
                </Space>
              );
            }
          },
          actions: {
            render: (text, row) => [
              <a
                href={row.html_url}
                target='_blank'
                rel='noopener noreferrer'
                key='warning'
              >
                答题
              </a>
            ]
          }
        }}
      />
    </div>
  );
}

export default observer(Home);

import { ProList } from '@ant-design/pro-components';
import { IPuzzle3Metadata, Puzzle3Difficulty } from '@puzzle3/types';
import { Avatar, Empty, Space, Tag, Typography, Button } from 'antd';
import React from 'react';

export interface IPuzzle {
  puzzleAddress: string;
  metadata: IPuzzle3Metadata;
}

export interface IPuzzleListProps {
  list: IPuzzle[];
  loading: boolean;
  createLoading: boolean;
  onClickSolve: (puzzleAddress: string) => void | Promise<void>;
}

export const PuzzleList: React.FC<IPuzzleListProps> = ({
  list,
  onClickSolve,
  loading,
  createLoading
}) => {
  if (!list.length) {
    return (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{ height: 160 }}
        description={'您还没有 Puzzle，点击上方的按钮创建'}
      ></Empty>
    );
  }
  return (
    <ProList<IPuzzle>
      rowKey='puzzleAddress'
      dataSource={list}
      showActions='hover'
      showExtra='hover'
      loading={loading}
      metas={{
        title: {
          dataIndex: ['metadata', 'name']
        },
        description: {
          dataIndex: ['metadata', 'description'],
          render: (dom) => <Typography.Text ellipsis>{dom}</Typography.Text>
        },
        avatar: {
          render: () => (
            <Avatar src='https://i.328888.xyz/2023/04/06/iNZt3L.png' />
          )
        },
        subTitle: {
          render: (_dom, entity) => {
            let text = '难度：简单';
            let color = 'green';
            switch (entity.metadata?.difficulty) {
              case Puzzle3Difficulty.Expert:
                text = '难度：专家';
                color = 'red';
                break;
              case Puzzle3Difficulty.Hard:
                text = '难度：高级';
                color = 'yellow';
                break;
              case Puzzle3Difficulty.Medium:
                text = '难度：中等';
                color = 'blue';
                break;
              case Puzzle3Difficulty.Easy:
              default:
                text = '难度：简单';
                color = 'green';
                break;
            }
            return (
              <Space size={0}>
                <Tag color={color}>{text}</Tag>
              </Space>
            );
          }
        },
        actions: {
          render: (_, row) => [
            <Button
              type='link'
              loading={createLoading}
              key='create_instance'
              onClick={() => {
                onClickSolve(row.puzzleAddress);
              }}
            >
              去答题
            </Button>
          ]
        }
      }}
    />
  );
};

PuzzleList.displayName = 'PuzzleList';
PuzzleList.defaultProps = {
  list: [],
  onClickSolve: () => {}
};

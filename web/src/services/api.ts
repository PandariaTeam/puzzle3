import { client } from './request';

export const getMetaDataById = (id: string) => {
  return client.get(`/${id}`);
};

export const putBoardDate = ({ board_id, ...rest }: any) => {
  client.put('/', { ...rest });
};

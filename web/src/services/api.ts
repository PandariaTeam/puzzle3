import { IPuzzle3Metadata } from '@puzzle3/types';
import { client } from './request';

export const getMetaDataById = (id: string) => {
  return client.get(`/${id}`);
};

interface PuzzleListParmas {
  puzzleAddressList: string[];
}
export const getPuzzleList = (payload: PuzzleListParmas) => {
  return client.post('/list', { ...payload });
};

interface Payload {
  metadata: IPuzzle3Metadata;
  puzzleAddress: string;
}
export const createPuzzle = (payload: Payload) => {
  return client.post('', { ...payload });
};

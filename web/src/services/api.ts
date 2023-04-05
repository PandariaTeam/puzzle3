import { IPuzzle3Metadata } from '@puzzle3/types';
import { client } from './request';

export const getMetaDataById = (id: string) => {
  return client.get(`/${id}`);
};

interface Payload {
  metadata: IPuzzle3Metadata;
}
export const createPuzzle = (payload: Payload) => {
  return client.post('', { ...payload });
};

import { IPuzzle3Metadata } from '@puzzle3/types';
import { createRoute } from './create-route';

export interface IPathParmas {
  puzzleId: string;
  nftId: string;
}

interface IResponse extends Record<PropertyKey, any> {}

export default createRoute<IResponse>(async (ctx) => {
  const { puzzleId, nftId } = ctx.irequest.params as unknown as IPathParmas;
  console.log(puzzleId);

  return {
    name: `Puzzle3 #${nftId}`,
    description: 'test puzzle',
    image: 'https://i.328888.xyz/2023/04/06/iNZt3L.png',
    properties: { number: Number(nftId), name: 'Puzzle3' }
  };
});

import { IPuzzle3Metadata } from '@puzzle3/types';
import { createRoute } from './create-route';

// POST metadata list
export interface IRequest {
  /**
   * Puzzle Address List
   */
  puzzleAddressList: string[];
}

interface IResponse {
  list: { puzzleAddress: string; metadata: IPuzzle3Metadata | null }[];
  total: number;
}

export default createRoute<IResponse>(async (ctx) => {
  const { puzzleAddressList } = await ctx.request.json<IRequest>();

  if (!puzzleAddressList?.length) {
    return {
      list: [],
      total: 0
    };
  }

  const result = await Promise.all(
    puzzleAddressList.map(async (addr) => {
      const metadata = await ctx.puzzle3_metadata_kv.get<IPuzzle3Metadata>(
        addr,
        {
          type: 'json',
          cacheTtl: 1 * 24 * 60 * 60
        }
      );
      return {
        puzzleAddress: addr,
        metadata
      };
    })
  );

  return {
    list: result,
    total: result.length
  };
});

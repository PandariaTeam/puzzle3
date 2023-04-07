import { IPuzzle3Metadata } from '@puzzle3/types';
import { createRoute } from './create-route';

// GET metadata
export interface IPathParmas {
  puzzleAddress: string;
}

interface IResponse {
  puzzleAddress: string;
  metadata: IPuzzle3Metadata;
}

export default createRoute<IResponse>(async (ctx) => {
  const { puzzleAddress } = ctx.irequest.params as unknown as IPathParmas;
  const metadata = await ctx.puzzle3_metadata_kv.get<IPuzzle3Metadata>(
    puzzleAddress,
    {
      type: 'json',
      cacheTtl: 1 * 24 * 60 * 60
    }
  );

  if (!metadata) {
    throw new Error('Puzzle not found by id: ' + puzzleAddress);
  }
  return {
    puzzleAddress,
    metadata
  };
});

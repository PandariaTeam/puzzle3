import { IPuzzle3Metadata } from '@puzzle3/types';
import { createRoute } from './create-route';

export interface IPathParmas {
  puzzleId: string;
}

interface IResponse {
  puzzleId: string;
  metadata: IPuzzle3Metadata;
}

export default createRoute<IResponse>(async (ctx) => {
  const { puzzleId } = ctx.irequest.params as unknown as IPathParmas;
  const metadata = await ctx.puzzle3_metadata_kv.get<IPuzzle3Metadata>(
    puzzleId,
    {
      type: 'json',
      cacheTtl: 1 * 24 * 60 * 60
    }
  );

  if (!metadata) {
    throw new Error('Puzzle not found by id: ' + puzzleId);
  }
  return {
    puzzleId,
    metadata
  };
});

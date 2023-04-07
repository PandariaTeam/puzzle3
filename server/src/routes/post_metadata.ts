import type { IPuzzle3Metadata } from '@puzzle3/types';
// import { v4 as uuidv4 } from 'uuid';
import { createRoute } from './create-route';

// POST metadata
export interface IRequest {
  /**
   * Metadata of the puzzle
   */
  metadata: IPuzzle3Metadata;
  /**
   * Puzzle Address
   */
  puzzleAddress: string;
}

interface IResponse {
  puzzleAddress: string;
}

export default createRoute<IResponse>(async (ctx) => {
  const { metadata, puzzleAddress } = await ctx.request.json<IRequest>();
  if (!puzzleAddress) {
    throw new Error('puzzleAddress not found');
  }
  // Put puzzle metadata
  await ctx.puzzle3_metadata_kv.put(puzzleAddress, JSON.stringify(metadata));
  return {
    puzzleAddress
  };
});

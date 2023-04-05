import type { IPuzzle3Metadata } from '@puzzle3/types';
import { v4 as uuidv4 } from 'uuid';
import { createRoute } from './create-route';

export interface IRequest {
  /**
   * Metadata of the puzzle
   */
  metadata: IPuzzle3Metadata;
  /**
   * Contract Address
   */
  contract?: string;
}

interface IResponse {
  puzzleId: string;
}

export default createRoute<IResponse>(async (ctx) => {
  const { metadata } = await ctx.request.json<IRequest>();
  const puzzleId = uuidv4();
  // Put puzzle metadata
  await ctx.puzzle3_metadata_kv.put(puzzleId, JSON.stringify(metadata));
  return {
    puzzleId
  };
});

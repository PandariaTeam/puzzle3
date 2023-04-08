import { IPuzzle3Metadata } from '@puzzle3/types';
import { createRoute } from './create-route';
import { getNft } from '../assets/nft';

// GET metadata
export interface IPathParmas {
  puzzleAddress: string;
  tokenId: string;
}

export default createRoute<any>(async (ctx) => {
  const { puzzleAddress, tokenId } = ctx.irequest
    .params as unknown as IPathParmas;
  const metadata = await ctx.puzzle3_metadata_kv.get<IPuzzle3Metadata>(
    puzzleAddress,
    {
      type: 'json'
    }
  );
  const svg = getNft(
    puzzleAddress,
    tokenId,
    metadata?.name || 'unknown',
    (metadata as any)?.autor || metadata?.author || 'unknown'
  );
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  });
});

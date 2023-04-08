import { IPuzzle3Metadata } from '@puzzle3/types';
import { createRoute } from './create-route';

// GET metadata
export interface IPathParmas {
  puzzleAddress: string;
  tokenId: string;
}

export default createRoute<any>(async (ctx) => {
  const { puzzleAddress, tokenId } = ctx.irequest
    .params as unknown as IPathParmas;
  const image = `https://service.puzzle3.cc/puzzles/${puzzleAddress}/${tokenId}/img.svg`;
  const metadata = await ctx.puzzle3_metadata_kv.get<IPuzzle3Metadata>(
    puzzleAddress,
    {
      type: 'json'
    }
  );
  return Response.json(
    {
      name: `Puzzle3 ${metadata?.name || ''} #${tokenId}`,
      description: `Puzzle3(ERC721Puzzle): ${metadata?.description || ''}`,
      image,
      // image: 'https://i.328888.xyz/2023/04/06/iNZt3L.png',
      attributes: [
        {
          trait_type: 'image',
          value: image
        },
        {
          trait_type: 'tokenId',
          value: tokenId
        }
      ],
      properties: {
        number: Number(tokenId),
        name: 'Puzzle3 ' + (metadata?.name || '')
      }
    },
    { status: 200 }
  );
});

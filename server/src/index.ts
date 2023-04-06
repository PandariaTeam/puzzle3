/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Router } from 'itty-router';
import { Context } from './context';
import getMetadataRoute from './routes/get_metadata';
// import getPuzzleRoute from './routes/get_puzzle';
import postMetadataRoute from './routes/post_metadata';

const router = Router();

export default {
  async fetch(
    request: Request,
    env: Record<PropertyKey, any>,
    context: ExecutionContext
  ) {
    // a generic error handler
    const errorHandler = (error: any) => {
      const errorResponse = Response.json(
        {
          message: error.message || '500 Internal Server Error',
          success: false,
          data: null
        },
        { status: error.status || 500 }
      );
      return errorResponse;
    };

    router
      .options(
        '*',
        () =>
          new Response(null, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Credentials': 'true'
            }
          })
      )
      .get('/puzzles/:puzzleId/:nftId', (req) => {
        const { puzzleId, nftId } = req.params;
        console.log(puzzleId);
        return Response.json(
          {
            name: `Puzzle3 #${nftId}`,
            description: 'test puzzle',
            image: 'https://i.328888.xyz/2023/04/06/iNZt3L.png',
            attributes: [
              {
                trait_type: 'background',
                value: 'blue'
              },
              {
                trait_type: 'type',
                value: 'charcoal mfer'
              },
              {
                trait_type: 'eyes',
                value: 'regular eyes'
              },
              {
                trait_type: 'mouth',
                value: 'smile'
              },
              {
                trait_type: 'headphones',
                value: 'black headphones'
              },
              {
                trait_type: 'long hair',
                value: 'long hair yellow'
              },
              {
                trait_type: '4:20 watch',
                value: 'argo black'
              },
              {
                trait_type: 'smoke',
                value: 'cig white'
              }
            ]
          },
          { status: 200 }
        );
      })
      .get('/api/metadata/:puzzleId', getMetadataRoute)
      .post('/api/metadata', postMetadataRoute);

    router.all('*', () => new Response('404 Not Found', { status: 404 }));

    // 实例化上下文
    const ctx = new Context({ request, env, ctx: context });

    // 返回路由处理结果
    return router.handle(request, ctx).catch(errorHandler);
  }
};

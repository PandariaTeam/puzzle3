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
import putMetadataRoute from './routes/put_metadata';

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

    // 页面响应
    router.get('/api/metadata/:nftId', getMetadataRoute);
    router.put('/api/metadata', putMetadataRoute);

    router.all('*', () => new Response('404 Not Found', { status: 404 }));

    // 实例化上下文
    const ctx = new Context({ request, env, ctx: context });

    // 返回路由处理结果
    return router.handle(request, ctx).catch(errorHandler);
  }
};

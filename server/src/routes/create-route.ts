import type { RouteHandler } from 'itty-router';
import { Context } from '../context';

// export type Handler = (request: Request) => Promise<Response>;

// create iity-router handler
export const createRoute = <Res = any>(
  handler: (ctx: Context) => Promise<Response | Res>
) => {
  const routeHandler = async (_request: Request, ctx: Context) => {
    const result = await handler(ctx);
    const response =
      result instanceof Response
        ? result
        : Response.json(
            { success: true, data: result, message: null },
            { status: 200 }
          );
    return response;
  };

  return routeHandler as unknown as RouteHandler;
};

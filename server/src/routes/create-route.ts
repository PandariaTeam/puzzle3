import type { IRequest, RouteHandler } from 'itty-router';
import { Context } from '../context';

// export type Handler = (request: Request) => Promise<Response>;

// create iity-router handler
export const createRoute = <Res = any>(
  handler: (ctx: Context) => Promise<Response | Res>
) => {
  const routeHandler: RouteHandler = async (
    _request: IRequest,
    ctx: Context
  ) => {
    ctx.irequest = _request;
    const result = await handler(ctx);
    const response =
      result instanceof Response
        ? result
        : Response.json(
            { success: true, data: result, message: null },
            { status: 200 }
          );

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', '*');
    response.headers.set('Access-Control-Allow-Headers', '*');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  };

  return routeHandler;
};

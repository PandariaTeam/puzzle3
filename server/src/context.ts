import { assert } from './utils';

/**
 * 封装后的请求上下文对象
 */
export class Context implements Record<PropertyKey, any> {
  /**
   * 原始请求对象
   */
  public readonly request!: Request;
  /**
   * 响应对象
   */
  public response?: Response;

  public readonly waitUntil!: ExecutionContext['waitUntil'];
  public readonly passThroughOnException!: ExecutionContext['passThroughOnException'];

  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  /**
   * KV: mapping(`secretKey:messageId` => IChatMessage)
   */
  public chatgpt_messages_kv!: KVNamespace;
  /**
   * KV: mapping(secretKey => tokenBalance)
   */
  public chatgpt_accounts_kv!: KVNamespace;
  /**
   * KV: mapping(`secretKey:conversationId` => messageId)
   */
  public chatgpt_conversations_kv!: KVNamespace;

  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;

  public constructor(params: {
    request: Request;
    env: Record<PropertyKey, any>;
    ctx: ExecutionContext;
  }) {
    // request
    this.request = params.request;

    // ExecutionContext
    this.waitUntil = params.ctx.waitUntil;
    this.passThroughOnException = params.ctx.passThroughOnException;

    // Env
    Object.assign(this, params.env);
  }

  public assert = assert;
}

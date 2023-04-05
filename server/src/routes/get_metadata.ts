import { createRoute } from './create-route';

interface IResponse {
  metadata: string;
}

export default createRoute<IResponse>(async (_ctx) => {
  return {
    metadata: 'get metadata'
  };
});

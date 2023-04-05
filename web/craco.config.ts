// @ts-ignore
import CracoAlias from 'craco-alias';

const config: any = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.json'
      }
    }
  ]
};

export default config;

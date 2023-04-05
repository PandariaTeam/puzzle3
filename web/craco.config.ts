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
  ],
  webpack: {
    configure: (webpackConfig: any) => {
      // add this line
      webpackConfig.output.libraryTarget = 'umd';
      webpackConfig.externals = {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom'
        }
      };
      return webpackConfig;
    }
  }
};

export default config;

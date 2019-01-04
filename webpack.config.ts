import * as DotEnv from 'dotenv-webpack';
import { resolve } from 'path';
import { Configuration } from 'webpack';

import { WebpackUserScript } from './scripts/lib';
import gitlabPipelines from './src/gitlabPipelines/userscript.meta';

const buildDirectory = resolve(__dirname, './build');

const createConfig = WebpackUserScript({
  mode: 'development',
  output: {
    path: buildDirectory,
    filename: `[name].js`,
  },
  devtool: 'inline-source-map',
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
    ],
  },
  plugins: [
    new DotEnv({ path: './.env', safe: true }) as any,
  ],
});

export default <Configuration[]> [
  createConfig(`./src/gitlabPipelines/index.ts`, gitlabPipelines),
];

import { resolve } from 'path';
import * as webpack from 'webpack';

import { WebpackUserScript } from './scripts/lib';
import gitlabPipelines from './src/gitlabPipelines/userscript.meta';

const buildDirectory = resolve(__dirname, './build');
const sourceDirectory = resolve(__dirname, '../src');

const createConfig = WebpackUserScript({
  mode: 'development',
  output: {
    path: buildDirectory,
    filename: `[name].js`,
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [],
});

export default <webpack.Configuration[]> [
  createConfig(`./src/gitlabPipelines/index.ts`, gitlabPipelines),
];

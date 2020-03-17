import { resolve } from 'path';
import { Configuration } from 'webpack';

import { WebpackUserScript } from './scripts/lib';
import gitlabMrList from './src/gitlabMrList/userscript.meta';
import gitlabPipelines from './src/gitlabPipelines/userscript.meta';
import ytHl from './src/youtubeHighlights/userscript.meta';

const buildDirectory = resolve(__dirname, './build');

const createConfig = WebpackUserScript({
  mode: 'development',
  output: {
    path: buildDirectory,
    filename: `[name].user.js`,
  },
  // devtool: 'inline-source-map',
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    mainFields: ['module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, use: 'ts-loader',

      },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
    ],
  },
});

export default <Configuration[]> [
  createConfig(`./src/gitlabPipelines/index.ts`, gitlabPipelines),
  createConfig(`./src/gitlabMrList/index.ts`, gitlabMrList),
  createConfig(`./src/youtubeHighlights/index.ts`, ytHl),
];

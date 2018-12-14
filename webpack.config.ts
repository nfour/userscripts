import { cloneDeep } from 'lodash';
import { resolve } from 'path';
import * as webpack from 'webpack';

import { createHeader } from './scripts/createHeader';
import gitlabPipelines from './src/gitlabPipelines/userscript.meta';
import { IMetaSchema } from './src/types/meta';

const base: webpack.Configuration = {
  mode: 'development',
  output: {
    path: resolve(__dirname, './build'),
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
};

export default <webpack.Configuration[]> [
  createScript(gitlabPipelines),
];

/**
 * Notes:
 * - Expects your `meta.name` to be the directory name
 */
function createScript (meta: IMetaSchema): webpack.Configuration {
  return {
    ...cloneDeep(base),
    entry: { [meta.name]: `./src/${meta.name}/index.ts` },
    plugins: [
      new webpack.BannerPlugin({
        banner: createHeader(meta),
        raw: true,
        entryOnly: true,
      }),
    ],
  };
}

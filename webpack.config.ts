import { resolve } from 'path';
import {
  TinyWebpackUserscriptPlugin,
  IMetaSchema,
} from 'tiny-webpack-userscript-plugin';
import { Configuration } from 'webpack';

import gitlabMrListMeta from './src/gitlabMrList/userscript.meta';
import gitlabPipelinesMeta from './src/gitlabPipelines/userscript.meta';
import ytHlMeta from './src/youtubeHighlights/userscript.meta';
import { repository } from './package.json';

const dir = (...paths: string[]) => resolve(__dirname, ...paths);

const DEV_URL = `http://localhost:9002`;

const baseConfig: Configuration = {
  mode: 'development',
  devtool: false,
  output: {
    path: dir('./build'),
    filename: '[name].user.js',
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};

const scripts = [
  { meta: gitlabMrListMeta, scriptName: 'gitlabMrList' },
  { meta: gitlabPipelinesMeta, scriptName: 'gitlabPipelines' },
  { meta: ytHlMeta, scriptName: 'youtubeHighlights' },
];

export default scripts.map(
  ({ meta, scriptName }): Configuration => {
    return {
      ...baseConfig,
      entry: {
        [scriptName]: dir(`./src/${scriptName}/index.ts`),
      },
      plugins: [
        new TinyWebpackUserscriptPlugin({
          scriptName,
          headers: [{ meta: addRepoUrlToMeta(scriptName, meta) }],
          developmentUrl: DEV_URL,
        }),
      ],
    };
  },
);

function addRepoUrlToMeta(scriptName: string, meta: IMetaSchema) {
  return {
    ...meta,
    homepageURL: repository.url,
    updateURL: `${repository.url}/master/tree/build/${scriptName}.user.js`,
    downloadURL: `${repository.url}/master/tree/build/${scriptName}.user.js`,
  };
}

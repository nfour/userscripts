import * as pad from 'pad';
import { resolve } from 'path';
import * as webpack from 'webpack';

import * as packageJson from './package.json';
import { IMetaSchema } from './src/types/meta';
import metaData from './src/userscript.meta';

const banner = generateUserScriptHeader(metaData);

export default <webpack.Configuration> {
  entry: ['./src/gitlabPipelines/index.ts'],
  mode: 'development',

  output: {
    path: resolve(__dirname, './build'),
    // library: 'foo',
    filename: `${packageJson.name}.user.js`,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner,
      raw: true,
      entryOnly: true,
    }),
  ],
};

export function generateUserScriptHeader (metadata: IMetaSchema) {
  const lines: string[] = [];
  const padLength = Math.max(...Object.keys(metadata).map((k) => k.length));
  const makeLine = (key: string, value: string) => `// @${pad(key, padLength)} ${value}`;

  lines.push('// ==UserScript==');
  for (const key of Object.keys(metadata)) {
    if (key[0] === '$') { continue; }
    const value = metadata[key];
    if (Array.isArray(value)) {
      for (const subValue of value) {
        lines.push(makeLine(key, subValue));
      }
    } else if (typeof (value) === 'string') {
      lines.push(makeLine(key, value));
    } else if (typeof (value) === 'boolean' && value) {
      lines.push(makeLine(key, ''));
    }
  }
  lines.push('// ==/UserScript==\n');

  return lines.join('\n');
}

import { IMetaSchema } from 'tiny-webpack-userscript-plugin';

export default {
  name: 'youtubeMarks',
  version: '0.0.1',
  namespace: 'nfour',
  description: 'Ability to mark videos to watch, queue etc.',
  include: ['*.youtube.com/*'],
  author: 'nfour',
  license: 'MIT',
} as IMetaSchema;

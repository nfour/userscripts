import { IMetaSchema } from 'tiny-webpack-userscript-plugin';

export default {
  name: 'gitlabPipelines',
  version: '0.2.3',
  namespace: 'nfour',
  description: 'Shows job output when interacting with MR job dropdowns',
  include: ['*gitlab.com*'],
  author: 'nfour',
  license: 'MIT',
} as IMetaSchema;

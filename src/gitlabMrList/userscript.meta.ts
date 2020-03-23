import { IMetaSchema } from 'tiny-webpack-userscript-plugin';

export default {
  name: 'gitlabMrList',
  version: '0.0.2',
  namespace: 'nfour',
  description: 'Enhances the Gitlab MR List of a project',
  include: ['*gitlab.com*'],
  author: 'nfour',
  license: 'MIT',
} as IMetaSchema;

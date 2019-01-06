import { IMetaSchema } from '../types/meta';

export default <IMetaSchema> {
  name: 'gitlabPipelines',
  version: '0.0.1',
  namespace: 'nfour',
  description: 'Shows job output when interacting with MR job dropdowns',
  include: ['*src.temando.io/*', '*gitlab.com*'],
};

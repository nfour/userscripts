import { repository } from '../../package.json';
import { IMetaSchema } from '../types/meta';

export default <IMetaSchema> {
  name: 'gitlabPipelines',
  version: '0.2.3',
  namespace: 'nfour',
  description: 'Shows job output when interacting with MR job dropdowns',
  include: ['*src.temando.io/*', '*gitlab.com*'],
  author: 'nfour',
  license: 'MIT',
  homepageURL: repository.url,
};

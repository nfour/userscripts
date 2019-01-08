import { repository } from '../../package.json';
import { IMetaSchema } from '../types/meta';

export default <IMetaSchema> {
  name: 'gitlabMrList',
  version: '0.0.1',
  namespace: 'nfour',
  description: 'Enhances the Gitlab MR List of a project',
  include: ['*src.temando.io/*', '*gitlab.com*'],
  author: 'nfour',
  license: 'MIT',
  homepageURL: repository.url,
};

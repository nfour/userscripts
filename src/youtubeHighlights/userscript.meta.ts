import { repository } from '../../package.json';
import { IMetaSchema } from '../types/meta';

export default <IMetaSchema> {
  name: 'youtubeMarks',
  version: '0.0.1',
  namespace: 'nfour',
  description: 'Ability to mark videos to watch, queue etc.',
  include: ['*.youtube.com/*'],
  author: 'nfour',
  license: 'MIT',
  homepageURL: repository.url,
};

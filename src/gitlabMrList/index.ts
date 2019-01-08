import * as $ from 'jquery';

import { paths } from './constants';
import { setupMrList } from './views';

void (async () => {
  const $mrList = $(paths.mrListContainer);

  await setupMrList($mrList);
})();

import $ from 'cash-dom';
import { nodeToObj } from 'diff-dom';

import { SELECTORS } from './constants';

console.log('YTHL INIT', { $, nodeToObj });

void (async () => {
  $(() => {
    console.log('YTHL dom ready');
    const tnel = $(SELECTORS.thumbnail).get()[0];

    console.log(
      'node',
      nodeToObj(tnel),
    );
  });
})();

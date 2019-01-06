import './styles.less';

import * as $ from 'jquery';

import { setupInputOnPipelineWidgets } from './views/setup';

void (async () => {
  setupInputOnPipelineWidgets($('.ci-widget.media'));
})();

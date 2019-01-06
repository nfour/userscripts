import './styles.less';

import * as $ from 'jquery';

import { setupInputOnPipelineWidgets } from './views';

void (async () => {
  setupInputOnPipelineWidgets($('.ci-widget.media'));
})();

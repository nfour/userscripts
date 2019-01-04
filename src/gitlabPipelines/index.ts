import './styles.less';

import * as $ from 'jquery';

import { setupInputOnPipelineWidgets } from './components';

void (async () => {
  setupInputOnPipelineWidgets($('.ci-widget.media'));
})();

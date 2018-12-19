import './index.css';

import * as $ from 'jquery';
import SelectorObserver from 'selector-observer';

console.log('hello universe 2222');

const $pipelineWigets = $('.ci-widget.media');

// TODO: fix snippets

$pipelineWigets.each((i, el) => {
  const observer = new SelectorObserver(el);

  observer.observe('.ci-job-component', {
    initialize (el) {
      console.log(el);

      $(el).append('foo');
    },
  });

});

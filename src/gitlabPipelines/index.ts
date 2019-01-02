import './index.css';

import * as $ from 'jquery';
import SelectorObserver from 'selector-observer';
import Simmer from 'simmerjs';

const getSelectorForElement = new Simmer();

console.log(`Userscript initializing: Gitlab Pipeline inline viewer`);

function pipelineViewButton () {
  const $viewButton = $(`
    <span class="pipelineViewButton">View</span>
  `);

  return $viewButton;
}

type IEl = JQuery<HTMLElement>;
function attachPipelineViewToWidget ({ $widget, source }: {
  $widget: IEl,
  /** @example /user.name/projectName/-/jobs/979858 */
  source: string;
}) {
  function pipelineOutputView () {
    return $(`
      <iframe
        class="pipelineOutputView"
        title="Pipeline"
        width="100%"
        height="400"
        src="${source}"
      ></iframe>
    `);
  }

  const $view = pipelineOutputView();

  $widget.append($view);
}

function setupInputOnPipelineWidgets ($pipelineWidgets: IEl) {
  $pipelineWidgets.each((i, widget) => {
    setupInputsOnPipelineList($(widget));
  });
}

function createIframeUrl (path: string) {
  // return `${window.location.protocol}//${window.location.hostname}${path}`;
  return `https://google.com`;
}

function setupInputsOnPipelineList ($widget: IEl) {
  function addButtonToList (row: Element) {
    const $row = $(row);
    const hrefPath = $row.find('.js-pipeline-graph-job-link').attr('href')!; // FIXME: check for undefined
    const source = createIframeUrl(hrefPath);

    const $viewButton = pipelineViewButton();

    $viewButton.on('click', () => {
      attachPipelineViewToWidget({ $widget, source });
    });

    $row.append($viewButton);
  }

  const widget = $widget.get(0);
  const observer = new SelectorObserver(widget);

  const selectorForListItems = `${getSelectorForElement(widget)} .ci-job-component`;

  observer.observe(selectorForListItems, { initialize: addButtonToList });
}

setupInputOnPipelineWidgets($('.ci-widget.media'));

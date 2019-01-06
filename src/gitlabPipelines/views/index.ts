import * as $ from 'jquery';
import SelectorObserver from 'selector-observer';
import Simmer from 'simmerjs';

import { classes, gitlabToken, paths } from '../constants';
import { JobTraceView } from './JobTraceView';

const getSelectorForElement = new Simmer();

export function setupInputOnPipelineWidgets ($pipelineWidgets: JQuery<Element>) {
  $pipelineWidgets.each((i, widget) => {
    setupInputsOnPipelineList($(widget));
  });
}

function setupInputsOnPipelineList ($container: JQuery<Element>) {
  const jobTraceView = new JobTraceView({ $container, pollingRate: 2000 });

  function addButtonToList (row: Element) {
    const $row = $(row);
    const url = $row.find(paths.pipelineDropdownJobButton).attr('href')!;

    const $viewButton = pipelineViewButton();

    $viewButton.on('click', () => jobTraceView.trace(url));

    $row.append($viewButton);
  }

  const widget = $container[0];
  const observer = new SelectorObserver(widget);

  const selectorForListItems = `${getSelectorForElement(widget)} ${paths.pipelineWidgetListItem}`;

  observer.observe(selectorForListItems, { initialize: addButtonToList });
}

function pipelineViewButton () {
  return $(`
    <span class="${classes.OpenPipelineButton}">
      <svg aria-hidden="true" class="s12 ic-doc-text">
        <use xlink:href="/assets/icons-ec735e9af30c747429d61fe78bd3073c9f4b10ae7fcb19f706d8ea0db2c170d7.svg#doc-text"></use>
      </svg>
    </span>
  `);
}

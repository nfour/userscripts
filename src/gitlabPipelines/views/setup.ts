import * as $ from 'jquery';
import SelectorObserver from 'selector-observer';
import Simmer from 'simmerjs';

import { classes, paths } from '../constants';
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

  /** Waits for the dom element to be loaded on the dom */
  observer.observe(selectorForListItems, { initialize: addButtonToList });
}

function pipelineViewButton () {
  return $(`
    <span class="${classes.OpenPipelineButton}"></span>
  `);
}

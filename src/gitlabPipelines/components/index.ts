import * as $ from 'jquery';
import SelectorObserver from 'selector-observer';
import Simmer from 'simmerjs';

import { classes, gitlabToken, paths } from '../constants';
import { extractProjectAndJobIdsFromUrl, GitlabApi, reuseElement as reuseElement } from '../lib';
import { JobTraceView } from './JobTraceView';

type IEl = JQuery<HTMLElement>;

const api = GitlabApi({ token: gitlabToken });
const getSelectorForElement = new Simmer();

export function setupInputOnPipelineWidgets ($pipelineWidgets: IEl) {
  $pipelineWidgets.each((i, widget) => {
    setupInputsOnPipelineList($(widget));
  });
}

function pipelineViewButton () {
  const $viewButton = $(`
    <span class="${classes.openPipelineButton}">View</span>
  `);

  return $viewButton;
}

function setupInputsOnPipelineList ($container: IEl) {
  const jobTraceView = new JobTraceView({ $container, api, pollingRate: 2000 });

  function addButtonToList (row: Element) {
    const $row = $(row);
    const url = $row.find(paths.pipelineDropdownJobButton).attr('href')!; // FIXME: check for undefined

    const $viewButton = pipelineViewButton();

    $viewButton.on('click', () => jobTraceView.setJob(url));

    $row.append($viewButton);
  }

  const widget = $container.get(0);
  const observer = new SelectorObserver(widget);

  const selectorForListItems = `${getSelectorForElement(widget)} ${paths.pipelineWidgetListItem}`;

  observer.observe(selectorForListItems, { initialize: addButtonToList });
}

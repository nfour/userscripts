import * as AnsiToHtml from 'ansi-to-html';
import * as $ from 'jquery';
import SelectorObserver from 'selector-observer';
import Simmer from 'simmerjs';

import { classes, gitlabToken } from './constants';
import { extractProjectAndJobIdsFromUrl, GitlabApi } from './lib';

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

async function showJobTraceView ({ $widget, source }: {
  $widget: IEl,
  /** @example http://.../user.name/projectName/-/jobs/979858 */
  source: string;
}) {
  const { jobId, projectId } = extractProjectAndJobIdsFromUrl(source);

  const uniqueTraceId = `${projectId}_${jobId}`;

  const $view = (() => {
    const existing = $widget.find(`[data-id="${uniqueTraceId}"]`);

    if (existing.length) { return existing; }

    const $viewEl = $(`<div class="${classes.jobTraceBox}" data-id="${uniqueTraceId}"><pre></pre></div>`);

    $widget.append($viewEl);

    return $viewEl;
  })();

  const text = await getJobTrace({ jobId, projectId });
  const html = new AnsiToHtml().toHtml(text);
  $view.find('pre').html(html);

  return $view;
}

function setupInputsOnPipelineList ($widget: IEl) {
  function addButtonToList (row: Element) {
    const $row = $(row);
    const source = $row.find('.js-pipeline-graph-job-link').attr('href')!; // FIXME: check for undefined

    const $viewButton = pipelineViewButton();

    $viewButton.on('click', () => {
      showJobTraceView({ $widget, source });
    });

    $row.append($viewButton);
  }

  const widget = $widget.get(0);
  const observer = new SelectorObserver(widget);

  const selectorForListItems = `${getSelectorForElement(widget)} .ci-job-component`;

  observer.observe(selectorForListItems, { initialize: addButtonToList });
}

async function getJobTrace ({ jobId, projectId }: {
  projectId: string;
  jobId: string
}) {
  const jobTrace = await api(`/projects/${projectId}/jobs/${jobId}/trace`, {
    headers: { accept: 'application/json' },
  });

  console.log({ jobTrace });

  return jobTrace.text();
}

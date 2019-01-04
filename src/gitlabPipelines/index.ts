import './index.css';

import * as $ from 'jquery';
import SelectorObserver from 'selector-observer';
import Simmer from 'simmerjs';

const gitlabToken = 'hcokDEgz7yrXmEvNo4NK';

function GitlabApi ({ token }: {
  token: string,
}) {
  return (url: string, options: RequestInit = {}) => {
    return fetch(`/api/v4${url}`, {
      headers: {
        'private-token': token,
        ...options.headers || {},
      },
      ...options,
    });
  };
}

type IEl = JQuery<HTMLElement>;

const getJson = (res: Response) => res.json();

const gitlabApi = GitlabApi({ token: gitlabToken });

/**
 *
 * TODO:
 * - cannot seem to use iframes due to X-frame deny
 *   - can we use express/node to proxy and change the header??
 *
 * - may need to poll the log output every second and simply re-render the text
 */

const getSelectorForElement = new Simmer();

console.log(`Userscript initializing: Gitlab Pipeline inline viewer`);

function pipelineViewButton () {
  const $viewButton = $(`
    <span class="gp--pipelineViewButton">View</span>
  `);

  return $viewButton;
}

function extractProjectAndJobIdsFromUrl (url: string) {
  const jobId = url.split('/').slice(-1)[0];
  const projectId = encodeURIComponent(url.split('/').slice(1, 3).join('/'));

  return { jobId, projectId };
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

    const $viewEl = $(`<div class="gp--jobTrace" data-id="${uniqueTraceId}"><code></code></div>`);

    $widget.append($viewEl);

    return $viewEl;
  })();

  const html = await getJobTrace({ jobId, projectId });

  $view.find('code').html(html);

  return $view;
}

function setupInputOnPipelineWidgets ($pipelineWidgets: IEl) {
  $pipelineWidgets.each((i, widget) => {
    setupInputsOnPipelineList($(widget));
  });
}

function createIframeUrl (path: string) {
  // return `${window.location.protocol}//${window.location.hostname}${path}`;
  return `https://github.com/`;
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
  const jobTrace = await gitlabApi(`/projects/${projectId}/jobs/${jobId}/trace`);

  console.log({ jobTrace });

  return jobTrace.text();
}

setupInputOnPipelineWidgets($('.ci-widget.media'));

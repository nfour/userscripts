import * as AnsiToHtml from 'ansi-to-html';

import { classes } from '../constants';
import { extractProjectAndJobIdsFromUrl, reuseElement as reuseElement } from '../lib';

export class JobTraceView {
  $container: JQuery<Element>;
  $jobBox: JQuery<Element>;
  api: typeof fetch;

  intervals: Map<string, NodeJS.Timer> = new Map();
  pollingRate: number;

  constructor ({ $container, pollingRate = 5000, api }: {
    $container: JobTraceView['$container'];
    pollingRate?: JobTraceView['pollingRate'];
    api: JobTraceView['api']
  }) {
    this.$container = $container;
    this.pollingRate = pollingRate;
    this.api = api;

    this.$jobBox = reuseElement({
      html: `<div class="${classes.jobViewBox}"></div>`,
      existing: this.$container.find(`.${classes.jobViewBox}`),
    });

    this.$container.append(this.$jobBox);
  }

  addJob (
    /** @example http://.../user.name/projectName/-/jobs/979858 */
    url: string,
  ) {
    const { jobId, projectId } = extractProjectAndJobIdsFromUrl(url);

    const traceId = `${projectId}_${jobId}`;

    const $job = reuseElement({
      html: `<div class="${classes.jobTrace}" data-id="${traceId}"><pre></pre></div>`,
      existing: this.$jobBox.find(`[data-id="${traceId}"]`),
    });

    this.$jobBox.append($job);

    // TODO: add close button

    const interval = setInterval(() => {
      getJobTrace({ jobId, projectId, api: this.api });
    }, 1000);

    this.intervals.set(traceId, interval as any);
  }
}

async function getJobTrace ({ jobId, projectId, api }: {
  projectId: string;
  jobId: string;
  api: typeof fetch;
}) {
  const jobTrace = await api(`/projects/${projectId}/jobs/${jobId}/trace`, {
    headers: { accept: 'application/json' },
  });

  console.log({ jobTrace });

  return new AnsiToHtml().toHtml(await jobTrace.text());
}

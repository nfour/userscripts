import AnsiUp from 'ansi_up';

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
      html: `<div class="${classes.jobTraceBox}"></div>`,
      existing: this.$container.find(`.${classes.jobTraceBox}`),
    });

    this.$container.append(this.$jobBox);
  }

  emptyJob () {
    this.intervals.forEach((timer) => {
      clearInterval(timer);
    });

    this.$jobBox.html('');
  }

  /** @param url @example http://.../user.name/projectName/-/jobs/979858 */
  async setJob (url: string) {
    this.emptyJob();

    const { jobId, projectId } = extractProjectAndJobIdsFromUrl(url);

    const traceId = `${projectId}_${jobId}`;

    const $job = reuseElement({
      html: `<div class=".build-page ${classes.jobTrace}" data-id="${traceId}"><pre></pre></div>`,
      existing: this.$jobBox.find(`[data-id="${traceId}"]`),
    });

    this.$jobBox.append($job);

    const $content = $job.find('pre');

    // TODO: add close button

    let lastTrace: string = '';
    let firstRender = true;

    const ansi = new AnsiUp();

    async function updateTrace () {
      const trace = await fetchJobTrace({ jobId, projectId });

      if (trace.length === lastTrace.length) {
        console.log('no changes');
        return;
      }

      const nextTrace = trace.slice(lastTrace.length);

      if (nextTrace.length) {
        render(ansi.ansi_to_html(nextTrace));
      }

      lastTrace = lastTrace + nextTrace;
    }

    const render = (content: string) => {
      $content.append(content);

      this.$jobBox.scrollTop(this.$jobBox[0].scrollHeight);
      firstRender = false;
    };

    const interval = setInterval(updateTrace, this.pollingRate);

    this.intervals.set(traceId, interval as any);

    await updateTrace();
  }
}

async function fetchJobTrace ({ jobId, projectId }: {
  projectId: string;
  jobId: string;
  api?: typeof fetch;
}) {
  // sam.johnson/temonodo/-/jobs/982180/raw
  const trace: string = await fetch(`/${projectId}/-/jobs/${jobId}/raw`)
    .then((res) => res.text());
    // .then((body) => body.html);

  return trace;
}

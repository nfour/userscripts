import 'xterm/dist/xterm.css';

import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';

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

  /** @param url @example http://.../user.name/projectName/-/jobs/979858 */
  async addJob (url: string) {
    const { jobId, projectId } = extractProjectAndJobIdsFromUrl(url);

    const traceId = `${projectId}_${jobId}`;

    const $job = reuseElement({
      html: `<div class=".build-page ${classes.jobTrace}" data-id="${traceId}"><div></div></div>`,
      existing: this.$jobBox.find(`[data-id="${traceId}"]`),
    });

    this.$jobBox.append($job);

    const $content = $job.find('div');

    // TODO: add close button

    let lastTrace: string = '';
    const term = new Terminal({
      fontSize: 13,
      scrollback: 999999,
      rows: 35,
    });

    term.open($content.get(0) as HTMLElement);

    async function updateTrace () {
      const trace = await fetchJobTrace({ jobId, projectId });

      if (trace.length === lastTrace.length) {
        console.log('no changes');
        return;
      }

      console.log({
        a: trace.length,
        b: lastTrace.length,
      });

      const nextTrace = trace.slice(lastTrace.length);

      if (nextTrace.length) {
        fit(term);
        trace.split('\n').forEach((ln) => term.writeln(ln));
      }

      lastTrace = lastTrace + nextTrace;
    }

    const interval = setInterval(updateTrace, 5000);
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

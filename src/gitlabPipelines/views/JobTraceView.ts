import AnsiUp from 'ansi_up';

import { classes } from '../constants';
import { extractProjectAndJobIdsFromUrl, reuseElement as reuseElement } from '../lib';

/**
 * Responsible for managing a view box underneath pipeline dropdown buttons to
 * show the selected jobs ANSI CLI trace text.
 */
export class JobTraceView {
  $jobTraceView: JQuery<Element>;
  pollingRate: number;

  private interval?: NodeJS.Timer;

  constructor ({ pollingRate = 5000, $container }: {
    $container: JQuery<Element>;
    pollingRate?: JobTraceView['pollingRate'];
  }) {
    this.pollingRate = pollingRate;

    this.$jobTraceView = reuseElement({
      html: `<div class="inactive ${classes.JobTraceView}"></div>`,
      existing: $container.find(`.${classes.JobTraceView}`),
    });

    $container.append(this.$jobTraceView);
  }

  /** Stops any existing job trace */
  stop () {
    clearInterval(this.interval!);

    this.$jobTraceView
      .html('')
      .removeClass('inactive')
      .addClass('inactive');
  }

  /**
   * Starts a trace for the provided job url
   *
   * @param url @example http://.../user.name/projectName/-/jobs/979858
   */
  async trace (url: string) {
    const ansi = new AnsiUp();
    let lastTrace: string = '';

    const periodicUpdate = async () => {
      const trace = await fetchJobTrace({ jobId, projectId });

      if (trace.length === lastTrace.length) {
        // No changes, exit
        return;
      }

      const nextTrace = trace.slice(lastTrace.length);

      if (nextTrace.length) {
        render(ansi.ansi_to_html(nextTrace));
      }

      lastTrace = lastTrace + nextTrace;
    };

    const render = (content: string) => {
      $text.append(content);

      this.$jobTraceView.scrollTop(this.$jobTraceView[0].scrollHeight);
    };

    this.stop();

    const { jobId, projectId, traceId } = extractProjectAndJobIdsFromUrl(url);

    const $jobTrace = $(`
      <div class="${classes.JobTrace}" data-id="${traceId}">
        <div class="${classes.JobTraceClose}">x</div>
        <pre></pre>
      </div>
    `);

    const $text = $jobTrace.find('pre');
    const $closeButton = $jobTrace.find(`.${classes.JobTraceClose}`);

    $closeButton.on('click', () => this.stop());

    this.$jobTraceView
      .removeClass('inactive')
      .append($jobTrace);

    this.interval = <any> setInterval(periodicUpdate, this.pollingRate);

    await periodicUpdate();
  }
}
/**
 * Fetches a job's trace ANSI CLI text from:
 * - /user/project/-/jobs/982180/raw
 */
async function fetchJobTrace ({ jobId, projectId }: { projectId: string; jobId: string; }) {
  return fetch(`/${projectId}/-/jobs/${jobId}/raw`)
    .then((res) => res.text());
}

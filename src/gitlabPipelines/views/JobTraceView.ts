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

  private updateTimer?: NodeJS.Timer;
  private checkCompletionTimer?: NodeJS.Timer;

  constructor ({ pollingRate = 5000, $container }: {
    $container: JQuery<Element>;
    pollingRate?: JobTraceView['pollingRate'];
  }) {
    this.pollingRate = pollingRate;

    this.$jobTraceView = reuseElement({
      html: `
        <div class="inactive ${classes.JobTraceView}">
          <span class="${classes.JobTraceClose}">X</span>
        </div>
      `,
      existing: $container.find(`.${classes.JobTraceView}`),
    });

    const $closeButton = this.$jobTraceView.find(`.${classes.JobTraceClose}`);
    $closeButton.on('click', () => this.disable());

    $container.append(this.$jobTraceView);
  }

  /**
   * Starts a trace for the provided job url.
   *
   * Polls for text using `this.pollingRate`.
   * Polls for meta every `this.pollingRate * 4`
   *
   * @param url @example http://.../user.name/projectName/-/jobs/979858
   */
  async trace (url: string) {
    const ansi = new AnsiUp();
    let lastTrace: string = '';

    /** On an interval, this will update the output if it has changed */
    const periodicUpdate = async () => {
      const trace = await fetchJobTrace({ jobId, projectId });

      if (trace.length === lastTrace.length) {
        // No changes, exit
        return;
      }

      const nextTrace = trace.slice(lastTrace.length);

      if (!nextTrace.length) { return; }

      lastTrace = lastTrace + nextTrace;

      render(ansi.ansi_to_html(nextTrace));
    };

    /** Checks for completion and stops fetching data if its done */
    const periodicStatusCheck = async () => {
      const { complete } = await fetchJobTraceMeta({ jobId, projectId });

      if (complete) { this.stopUpdates(); }
    };

    const render = (content: string) => {
      $text.append(content);

      this.$jobTraceView.scrollTop(this.$jobTraceView[0].scrollHeight);
    };

    this.disable();

    const { jobId, projectId, traceId } = extractProjectAndJobIdsFromUrl(url);

    const $jobTrace = $(`<div class="${classes.JobTrace}" data-id="${traceId}"><pre></pre></div>`);
    const $text = $jobTrace.find('pre');

    this.$jobTraceView
      .removeClass('inactive')
      .append($jobTrace);

    this.updateTimer = <any> setInterval(periodicUpdate, this.pollingRate);
    this.checkCompletionTimer = <any> setInterval(periodicStatusCheck, this.pollingRate * 4);

    await periodicUpdate();
  }

  /** Stops any existing job trace */
  stopUpdates () {
    clearInterval(this.updateTimer!);
    clearInterval(this.checkCompletionTimer!);
  }

  close () {
    this.$jobTraceView
      .removeClass('inactive')
      .addClass('inactive')
      .find(`.${classes.JobTrace}`).remove();
  }

  disable () {
    this.stopUpdates();
    this.close();
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

interface IJobTraceMeta {
  append: boolean;
  complete: boolean;
  html: string;
  id: number;
  offset: number;
  size: number;
  state: string;
  status: 'success' | 'pending' | 'failed';
  total: number;
  truncated: boolean;
}

async function fetchJobTraceMeta ({ jobId, projectId }: { projectId: string; jobId: string; }) {
  const data: IJobTraceMeta = await fetch(`/${projectId}/-/jobs/${jobId}/trace.json`, { headers: { accept: 'application/json' } })
    .then((res) => res.json());

  return data;
}

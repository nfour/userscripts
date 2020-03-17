declare module 'simmerjs' {
  const Simmer: {
    new (): (el: Element) => string;
  };

  export default Simmer;
}

declare module 'ansi-to-html' {
  const AnsiToHtml: {
    new (): { toHtml (str: string): string };
  };

  export = AnsiToHtml;
}

declare module 'blissfuljs' {
  const mod: BlissNS.BlissStatic;

  export = mod;
}

declare module 'diff-dom' {
  interface IOptions {
    debug: false;
    /** Limit for how many diffs are accepting when debugging. Inactive when debug is false. */
    diffcap: number;
    /** False or a numeral. If set to a numeral, limits the level of depth that the the diff mechanism looks for differences. If false, goes through the entire tree. */
    maxDepth: number | false;
    /** False or a numeral. If set to a numeral, only does a simplified form of diffing of contents so that the number of diffs cannot be higher than the number of child nodes. */
    maxChildCount: number;
    /** Whether to take into consideration the values of forms that differ from auto assigned values (when a user fills out a form). */
    valueDiffing: true;
    filterOuterDiff: any;
    /** Whether to work with compressed diffs */
    compress: boolean;
    /** object with strings for every change types to be used in diffs. */
    _const: boolean;
    document: any;
    /** syntax: textDiff: function (node, currentValue, expectedValue, newValue) */
    textDiff (): any;
    /** empty functions were benchmarked as running faster than both */
    /** `f && f()` and `if (f) { f(); }` */
    preVirtualDiffApply (): any;
    postVirtualDiffApply (): any;
    preDiffApply (): any;
    postDiffApply (): any;
  }

  // tslint:disable: max-classes-per-file
  export function nodeToObj (node: Element): any;
  export function stringToObj (str: string): any;
  export class TraceLogger {}
  export class DiffDOM {
    constructor (options: Partial<IOptions>)

    apply (...args: any[]): any;
    undo (...args: any[]): any;
    diff (...args: any[]): any;
  }
}

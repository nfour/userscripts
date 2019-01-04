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

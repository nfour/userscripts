import $, { Cash } from 'cash-dom';
import cn from 'classnames';
import { DiffDOM, nodeToObj } from 'diff-dom';
import { action, observable, ObservableMap, observe } from 'mobx';

import { CLASSES, SELECTORS } from './constants';

class VideoThumbnail {
  $self: Cash;
  id: string;

  hasInit = false;

  $highlightBtn!: Cash;

  state = observable({
    isHighlighted: false,
    styles: {
      highlightButton: `
        display: inline-block;
        position: relative;
        bottom: 0;
        right: 0;
        width: 30px;
        height: 30px;
        outline: 2px solid rgb(29, 185, 84, 0.5);
        padding: 1em;
        text-align: center;
        content: "✓";
      `,
      // highlightButton: {
      //   display: 'inline-block',
      //   position: 'relative',
      //   bottom: '0',
      //   right: '0',
      //   width: '30px',
      //   height: '30px',
      //   outline: '2px solid rgb(29, 185, 84, 0.5)',
      //   padding: '1em',
      //   textAlign: 'center',
      //   content: '"✓"',
      // }
    },
  });

  constructor (el: Cash) {
    this.$self = el;
    this.id = this.$self.attr('href')!;
  }

  init () {
    if (this.hasInit) { return; }

    console.log('initting', this);

    this.hasInit = true;

    this.$highlightBtn = $(`<div />`)
      .attr('style', this.state.styles.highlightButton);

    const toggleHighlighted = action(() => { this.state.isHighlighted = !this.state.isHighlighted; });

    this.$highlightBtn.on('click', toggleHighlighted);

    observe(this.state, (change) => {
      console.log(`VideoThumbnail changed: ${change.type}`, change);

      this.render();
    });
  }

  render () {
    this.init();

    const $prev = this.$self;
    const $next = $prev.clone();

    const classes = cn(
      cn($prev.attr('class')),
      { [CLASSES.isHighlighted]: this.state.isHighlighted },
    );

    $next.attr('class', classes);

    $next.append(this.$highlightBtn);

    console.log({ classes, $next, $prev });
    console.log('22222');

    const diffDom = new DiffDOM({ maxDepth: 4 });

    const diff = diffDom.diff($prev.get()[0], $next.get()[0]);

    diffDom.apply($prev.get()[0], diff);
  }

}

export function Renderer () {
  console.log('renderer');
  const store = {
    thumbnails: new ObservableMap<string, VideoThumbnail>(),
    addNewThumbnails (thumbnails: VideoThumbnail[]) {
      return thumbnails
        .filter((item) => !store.thumbnails.has(item.id))
        .map((item) => {
          store.thumbnails.set(item.id, item);
          return item;
        });
    },
  };

  // Debugging
  (window as any).store = store;

  const render = () => {
    console.log('RENDER!!!!');

    const thumbnails = findThumbnailsOnPage();
    store.addNewThumbnails(thumbnails);

    thumbnails.forEach((tn) => tn.render());

  };

  return render;
}

function findThumbnailsOnPage (): VideoThumbnail[] {
  const $thumbnails = $(SELECTORS.thumbnail);

  return $thumbnails.get().map((el) => new VideoThumbnail($(el)));
}

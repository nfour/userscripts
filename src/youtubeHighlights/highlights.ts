import * as $$ from 'blissfuljs';
import $, { Cash } from 'cash-dom';
import cn from 'classnames';
import { DiffDOM, nodeToObj } from 'diff-dom';
import { action, observable, ObservableMap, observe } from 'mobx';
import * as snab from 'snabbdom';
import toVNode from 'snabbdom/tovnode';

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
    this.hasInit = true;

    console.log({ vnode: toVNode(this.$self.get()[0]) });

    const toggleHighlighted = action(() => {
      console.log('clicked', this.id);
      this.state.isHighlighted = !this.state.isHighlighted;
    });

    this.$highlightBtn = $(`<div></div>`)
      .attr('style', this.state.styles.highlightButton)
      .on('click', toggleHighlighted);

    observe(this.state, (change) => {
      console.log(`VideoThumbnail changed: ${change.type}`, change);

      this.render();
    });
  }

  // try this https://github.com/snabbdom/snabbdom#snabbdomtovnode
  render () {
    this.init();

    $$.set(this.$self.get(0)!, {

    });
  }

}

export function Renderer () {
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

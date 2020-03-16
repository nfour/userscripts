import { observable, ObservableMap } from 'mobx';

import { CLASSES, SELECTORS } from './constants';

interface IThumbnail {
  $el: JQuery;
  href: string; // /watch?v=...
  state: {
    isDimmed: boolean;
    isHighlighted: boolean;
    isSetup: boolean;
  };
}

const $defaultHighlightButton = $(`<div class="${CLASSES.highlightButton}" />`);
const $defaultDimButton = $(`<div class="${CLASSES.dimButton}" />`);

/**
 * TODO: figure out render flow.
 * - renderer creates a mobx store
 * - render:
 *   - read thumbnail elements on page, key them by href or dom-node-id
 *   - update state for any newly detected elements
 *   - for each thumbnail, attach event listeners, but only once.
 *     - listen to thumbnail object state once for each, allowing them to re-render independantly
 *     - on hightlight button click, set isHighlighted to true in state
 *     - should cause the observable to emit a change for that object
 *     - when that object changes, re-render just that thumbnail.
 *
 */

export function Renderer () {
  const store = {
    thumbnails: new ObservableMap<string, IThumbnail>(),
    addNewThumbnails (thumbnails: IThumbnail[]) {
      thumbnails
        .filter((tn) => !store.thumbnails.has(tn.href))
        .forEach((tn) => store.thumbnails.set(tn.href, tn));

      store.thumbnails.forEach(setupThumbnailListeners);
    },
  };

  const render = () => {
    const thumbnails = findThumbnailsOnPage();
    store.addNewThumbnails(thumbnails);
  };

  return render;
}

export function findThumbnailsOnPage (): IThumbnail[] {
  const $thumbnails = $(SELECTORS.thumbnail);

  return $thumbnails.get().map((el): IThumbnail => {
    const $el = $(el);

    return {
      $el,
      href: $el.attr('href')!,
      state: observable({
        isSetup: false,
        isDimmed: false,
        isHighlighted: false,
      }),
    };
  });
}

function setupThumbnailListeners (tn: IThumbnail) {
  if (tn.state.isSetup) { return; }
  tn.state.isSetup = true;

  const $highlight = $defaultHighlightButton.clone();
  const $dim = $defaultDimButton.clone();

  tn.$el.append($highlight, $dim);

  $highlight.on('click', () => {
    tn.$el.removeClass(CLASSES.isDimmed);
    tn.$el.toggleClass(CLASSES.isHighlighted);
  });

  $dim.on('click', () => {
    tn.$el.removeClass(CLASSES.isHighlighted);
    tn.$el.toggleClass(CLASSES.isDimmed);
  });

}

// import $, { Cash } from 'cash-dom';
// import { nodeToObj } from 'diff-dom';
// import { ObservableMap } from 'mobx';

// import { CLASSES, SELECTORS } from './constants';

// class VideoThumbnail {
//   $self: Cash;
//   href: string;

//   isInit = false
//   isDimmed = false
//   isHighlighted = false

//   $highlightBtn: Cash

//   static $defaultHighlightBtn = $(`<div class="${CLASSES.highlightButton}" />`)

//   constructor(el: Cash) {
//     this.$self = el
//     this.href = this.$self.attr('href')!;
//     this.$highlightBtn = VideoThumbnail.$defaultHighlightBtn.clone();
//   }

//   render () {

//   }

//   onHighlight() {

//   }

//   onDim() {

//   }
// }


// export function Renderer () {
//   const store = {
//     thumbnails: new ObservableMap<string, VideoThumbnail>(),
//     addNewThumbnails (thumbnails: VideoThumbnail[]) {
//       thumbnails
//         .filter((tn) => !store.thumbnails.has(tn.href))
//         .forEach((tn) => store.thumbnails.set(tn.href, tn));

//       store.thumbnails.forEach(setupThumbnailListeners);
//     },
//   };

//   // Debugging
//   (global as any).store = store;

//   const render = () => {
//     const thumbnails = findThumbnailsOnPage();
//     store.addNewThumbnails(thumbnails);
//   };

//   return render;
// }

// function findThumbnailsOnPage (): VideoThumbnail[] {
//   const $thumbnails = $(SELECTORS.thumbnail);

//   return $thumbnails.get() .map((el) => new VideoThumbnail(el));
// }


// function setupThumbnailListeners (tn) {
//   if (tn.isSetup === true) { return tn as IThumbnailWithSetup; }
//   tn.isSetup = true;

//   const $highlight = $defaultHighlightButton.clone();
//   const $dim = $defaultDimButton.clone();

//   tn.$el.append($highlight, $dim);

//   $highlight.on('click', () => {
//     tn.$el.
//     tn.$el.removeClass(CLASSES.isDimmed);
//     tn.$el.toggleClass(CLASSES.isHighlighted);
//   });

//   $dim.on('click', () => {
//     tn.$el.removeClass(CLASSES.isHighlighted);
//     tn.$el.toggleClass(CLASSES.isDimmed);
//   });

//   return {
//     ...tn,
//     $dim, $highlight,
//   };
// }

// function domApplicator () {

// }

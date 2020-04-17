import $ from 'cash-dom';
import { Renderer } from './highlights';

void (async () => {
  $(() => {
    const render = Renderer();
    render();
  });
})();

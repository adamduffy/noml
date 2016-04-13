import * as noml from './noml';
import {ui} from './noml';
import {Logic} from './logic';
import {Container} from './pages/container.ts';
import {TodoPage} from './pages/todo.ts';

const w = window as any;
w.onload = windowOnLoad();

function windowOnLoad() {
  w.onhashchange = hashChanged;
  hashChanged();
}

function hashChanged() {
  const start = performance.now();
  let hash = window.location.hash;
  hash = hash ? hash.substring(1) : '';
  const page = getPage(hash);
  noml.renderPage(page);
  const end = performance.now();
  console.log('page refresh in ' + (end - start) + 'ms');
}

function getPage(hash: string) {
  const logic = new Logic();
  return new Container(
    new TodoPage(logic, null)
  ).style(ui.styles);
}

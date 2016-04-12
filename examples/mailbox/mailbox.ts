import * as noml from './noml';
import * as Logic from './logic';
import {ui} from './noml';
import {state} from './state';
import {data} from './data';
import MailboxPage from './pages';

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
  const parts = hash.split('/');
  state.mailbox.selectedId = parts[0];
  state.message.selectedId = parseInt(parts[1], 0);
  return new MailboxPage(Logic, "page").style(ui.styles);
}

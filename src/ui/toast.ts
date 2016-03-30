import {Element} from './element.ts';

export class Toast extends Element {

  _ref = true;

  constructor() {
    super('span');
    this.class('toast');
  }
  show(message: string, isError: boolean) {
    this.clear();
    if (message) {
      this.child(message);
      // this.class(isError ? 'error' : 'status');
    }
    this.render();
  }

  showError(e: Error) {
    if (e) {
      this.show(e.message, true);
    } else {
      this.clear();
    }
  }

  showStatus(message: string) {
    this.show(message, false);
  }

  clear() {
    this.children.length = 0;
    // this.unclass('error status');
    this.render();
  }

};

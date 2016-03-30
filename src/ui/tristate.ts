import {Element} from './element.ts';
import {Event} from '../event.ts';

export class Tristate<T> extends Element {

  _ref = true;
  _promise: () => Promise<T>;
  _pending: () => any;
  _ready: (T) => any;
  _fail: (e) => any;

  constructor(promise: () => Promise<T>, pending: () => any, ready: (T) => any, fail: (e) => any) {
    super('tristate');
    this._promise = promise;
    this._pending = pending;
    this._ready = ready;
    this._fail = fail;
    this.refresh();
  }

  refreshOn<T>(e: Event<T>): this {
    e.hook(() => this.refresh());
    return this;
  }

  refresh() {
    const p = this._promise();
    if (p) {
      this.xchild(this._pending());
    } else {
      this.xchild();
      return;
    }
    p.then(
      v => this.xchild(this._ready(v)),
      e => this.xchild(this._fail(e))
    ).then(() => this.render());
  }

}

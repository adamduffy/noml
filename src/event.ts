import {autobind} from 'core-decorators';

type handler = (T) => any;

export class Event<T> {

  handlers: Array<handler> = [];

  hook(f: handler) {
    this.handlers.push(f);
  }

  @autobind
  notify(value: T): T {
    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i](value);
    }
    return value;
  }

}

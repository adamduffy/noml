import {autobind} from 'core-decorators';

export type Handler = (T) => any;

export class Event<T> {

  handlers: Array<Handler> = [];

  hook(f: Handler) {
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

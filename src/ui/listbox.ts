import {Element} from './element';
import {Option, Item} from './option';

export class Listbox extends Element {

  constructor(items?: Item[]) {
    super('select');
    if (items) {
      this.child(
        Array.from(items, item => new Option(item))
      );
    }
  }

  onChange(callback: (e) => void): this {
    return this.event({change: callback});
  }

  onValueChanged(callback: (v) => any): this {
    return this.onChange(e => callback(e.target.value));
  }

  size(size: number): this {
    return this.prop({size});
  }

};

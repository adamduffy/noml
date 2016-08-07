import {Element} from './element';
import {Option, Item} from './option';

export class Select extends Element {

  constructor(items?: Item[]) {
    super('select');
    if (items) {
      this.child(
        Array.from(items, item => new Option(item))
      );
      if (!items.some(i => i.selected)) {
        this.children.splice(0, 0, new Option({}).disable());
      }
    }
  }

  onChange(callback: (e) => any): this {
    return this.event({change: callback});
  }

  onValueChanged(callback: (v: string) => any): this {
    return this.onChange(e => callback(e.target.value));
  }

};

import {Element} from './element';

export interface Item {
  id?: string;
  text?: string;
  selected?: boolean;
}

export class Option<T> extends Element {

  _ref = true;

  constructor(item: Item) {
    super('option');
    const {id, text, selected} = item;
    this.prop({value: (id !== undefined ? id : text)});
    this.child(text !== undefined ? text : id);
    if (selected) {
      this.select();
    }
  }

  select(): this {
    return this.prop({selected: 'selected'});
  }

  disable(): this {
    return this.prop({disabled: 'disabled'});
  }

}

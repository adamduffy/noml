import {Element} from './element.ts';

export class Option<T> extends Element {

  _ref = true;

  constructor(text: string, id?: string, selected?: boolean) {
    super('option');
    this.prop({value: (id !== undefined ? id : text)});
    this.child(text || '');
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

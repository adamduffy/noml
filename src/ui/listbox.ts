import {Element} from './element';
import {Option} from './option';

export class Listbox extends Element {

  constructor(selectedId: string, ids: string[], displayName?: (id: string) => string) {
    super('select');
    this.child(
      Array.from(ids, id => {
        let selected = (selectedId === id);
        return new Option(displayName ? displayName(id) : id, id, selected);
      })
    );
  }

  size(size: number): this {
    return this.prop({size});
  }

};

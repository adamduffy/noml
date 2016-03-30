import {Element} from './element.ts';
import {Option} from './option.ts';

export class Select extends Element {

  constructor(selectedId: string, ids: string[], displayName?: (id: string) => string) {
    super('select');
    let hasSelection = false;
    this.child(
      Array.from(ids, id => {
        let selected = false;
        if (selectedId === id) {
          hasSelection = true;
          selected = true;
        }
        return new Option(displayName ? displayName(id) : id, id, selected);
      })
    );
    if (!hasSelection) {
      this.children.splice(0, 0, new Option('', '', true).disable());
    }
  }

};

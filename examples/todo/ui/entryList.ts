import {ui} from '../noml.ts';
import {Entry} from '../api';

export interface Logic {
  selectEntry(id: string);
  getSelectedEntry(): string;
}

export class EntryList extends ui.Component<Logic, void> {

  entries: Entry[];

  data(entries: Entry[]): this {
    this.entries = entries;
    return this;
  }

  getMessage(data: Entry[], id: string): string {
    let entry = data.find(e => e.id === id);
    return entry ? entry.message : '';
  }

  getBody() {
    const {entries, logic} = this;
    const selectedId = logic.getSelectedEntry();
    let ids: string[] = [];
    entries.forEach(entry => ids.push(entry.id));
    return new ui.Listbox(selectedId, ids, id => this.getMessage(entries, id))
      .size(5)
      .onChange(e => logic.selectEntry(e.target.value));
  }

}

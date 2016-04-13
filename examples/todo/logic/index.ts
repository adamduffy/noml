import * as api from '../api';
import {Entry} from '../api';
import {Event} from '../noml';

export class Logic {

  entriesChanged = new Event<Entry | void>();
  selectedEntry: string;

  selectEntry(id: string) {
    this.selectedEntry = id;
  }

  getSelectedEntry() {
    return this.selectedEntry;
  }

  getEntries(): Promise<Entry[]> {
    return api.list();
  }

  addEntry(e: api.Entry): Promise<Entry> {
    return api.add(e).then(this.entriesChanged.notify);
  }

  deleteEntry(id: string = this.selectedEntry): Promise<void> {
    if (!id) {
      return Promise.resolve();
    }
    return api.destroy(id).then(this.entriesChanged.notify);
  }

  deleteAll(): Promise<void> {
    return api.destroyAll().then(this.entriesChanged.notify);
  }

}

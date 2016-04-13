import {AddEntry, Logic as CreateEntryLogic} from '../ui/addEntry.ts';
import {EntryList, Logic as EntryListLogic} from '../ui/entryList.ts';
import {ui, Event} from '../noml.ts';
import {Entry} from '../api';

export interface Logic extends CreateEntryLogic, EntryListLogic {
  getEntries(): Promise<Entry[]>;
  deleteEntry(id?: string): Promise<void>;
  entriesChanged: Event<any>;
}

export class TodoPage extends ui.Component<Logic, any> {

  getBody() {
    const {logic} = this;
    return ui.flexDown(
      new AddEntry(logic),
      ui.flexRight(
        new ui.Tristate(logic.getEntries,
          () => 'loading',
          entries => new EntryList(logic).data(entries),
          e => 'failed to load entries'
        ).refreshOn(logic.entriesChanged),
        ui.flexDown(
          ui.flexPad(),
          ui.button('delete', () => logic.deleteEntry())
        )
      )
    );
  }

}

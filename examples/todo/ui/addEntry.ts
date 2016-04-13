import {ui} from '../noml.ts';
import * as api from '../api';

export interface Logic {
  addEntry(e: api.Entry): Promise<any>;
}

export class AddEntry extends ui.Component<Logic, void> {

  getBody() {
    const input = ui.input('input').autocomplete(false).ref();
    return ui.form(input, ui.button('submit')).onSubmit(() => {
      const message = input.getValue();
      input.setValue('');
      input.focus();
      if (message === '') {
        return;
      }
      return this.logic.addEntry({message});
    });
  }

}

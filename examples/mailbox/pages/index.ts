import FullMailbox from '../ui/fullMailbox.ts';
import {ui} from '../noml.ts';
import {CssVar} from '../ui/cssvar';

export interface Style {
  $clickable?;
  '#main'?;
  '#main div'?;
}

export default class extends ui.Component<any, Style> {

  getDefaultStyle(): any {
    return {
      $clickable: {
        cursor: 'pointer',
        ':hover': {
          'text-decoration': 'underline'
        }
      },
      '#main': {
        display: 'flex',
        width: '100%',
      }
    };
  }

  getBody() {
    return new FullMailbox(this.logic, "main");
  }

}

import {ui} from '../noml';
import Folders, {Logic as FoldersLogic} from './folders';
import Mailbox from './mailbox';
import MessageUi from './message';
import {state} from '../state';

export interface Style {
  '#folders'?;
  $mailContainer?;
  $error?;
}

export interface Logic {
  folders: FoldersLogic;
  mailbox: any;
  message: any;
}

export default class extends ui.Component<Logic, Style> {

  getDefaultStyle() {
    return {
      '#folders': {
        border: '1px solid #ccc'
      },
      $mailContainer: {
        border: '1px solid #ccc'
      },
      $error: {
        color: 'red'
      }
    };
  }

  getBody() {
    const {folders, mailbox, message} = this.logic;

    const messagePromise = ui.delayedPromise(message.getSelectedMessage).then(x => {
      // throw new Error('failed to load message');
      return x;
    });

    const hasMailbox = !!state.mailbox.selectedId;
    const hasMessage = !!state.message.selectedId;

    return ui.flexRight(
      new Folders(folders, 'folders'),
      ui.flexDown().class('mailContainer').child(
        new Mailbox(mailbox, 'mailbox'),
        new ui.Tristate(() => hasMailbox && hasMessage && messagePromise,
          () => 'pending',
          m => new MessageUi({getMessage: () => m}, 'message'),
          e => ui.span(e.message).class('error')
        )
      )
    );
  }

}

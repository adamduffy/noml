import {ui} from '../noml.ts';
import {tableRowHeader, tableRowData} from './common';
import {Mailbox} from '../data';

export interface Style {
  $selected?;
  $mailboxClass?;
  tr?;
  td?;
}

export interface Logic {
  gotoMessage(mailboxId: string, messageId: string): void;
  isMessageSelected(id: string): boolean;
  getSelectedMailbox(): Mailbox;
}

export default class extends ui.Component<Logic, Style> {

  getDefaultStyle(): Style {
    return {
      $selected: {'font-weight': 'bold'},
      $mailboxClass: {
        'background-color': 'lightgray',
        ' td': {
          padding: '5px'
        }
      },
      tr: {
        '.clickable:hover': {
          'color': 'darkblue'
        }
      }
    };
  }

  getMessageRows(box: Mailbox): any {
    const {logic} = this;
    return Array.from(box.messages, (m: any) => {
      return tableRowData(m.date.toLocaleDateString(), m.subject, m.from, m.to)
        .class('clickable')
        .classIf(logic.isMessageSelected(m.id), 'selected')
        .onClick(() => logic.gotoMessage(box.id, m.id));
    });
  }

  getBody(): ui.Element {
    let box = this.logic.getSelectedMailbox();
    if (!box) {
      return ui.span('select a mailbox');
    }
    return ui.table().class('mailboxClass').child(
      tableRowHeader('date', 'subject', 'from', 'to'),
      this.getMessageRows(box)
    );
  }

}

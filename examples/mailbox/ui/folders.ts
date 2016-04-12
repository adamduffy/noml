import {ui} from '../noml.ts';
import {Folders, Mailbox} from '../data';

export interface Style {
  $foldersClass?;
  $count?;
  $selected?;
};

export interface Logic {
  isMailboxSelected(id: string): boolean;
  gotoMailbox(id?: string): void;
  getMailboxes(): Mailbox[];
}

export default class extends ui.Component<Logic, Style> {

  getDefaultStyle(): Style {
    return {
      $foldersClass: {
        color: 'blue',
        width: '150px',
        margin: '10px'
      },
      $count: {
        float: 'right'
      },
      $selected: {
        'background-color': 'lightgray'
      }
    };
  }

  getBody() {
    const boxes = this.logic.getMailboxes();
    const {div, ul, li, h2} = ui;
    return div().class('foldersClass').child(
      ul(li(
        h2("Mailboxes").class('clickable').onClick(_ => this.logic.gotoMailbox()),
        Array.from(boxes, m => this.getMenuItem(m))
    )));
  }

  getMenuItem(box: Mailbox) {
    return ui.li()
      .class('clickable')
      .classIf(this.logic.isMailboxSelected(box.id), 'selected')
      .onClick(_ => this.logic.gotoMailbox(box.id))
      .child(ui.span(box.messages.length).class('count'), box.name);
  }

}

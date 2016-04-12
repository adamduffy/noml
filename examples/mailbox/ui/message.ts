import {ui} from '../noml.ts';
import {Message} from '../data';

export interface Logic {
  getMessage(): Message;
}

export interface Style {
  $messageClass?;
  $messageHeader?;
}

function trThTd(th: string, td: string) {
  return ui.tr(ui.th(th), ui.td(td));
}

export default class extends ui.Component<Logic, Style> {

  getDefaultStyle(): Style {
    return {
      $messageClass: {
        color: 'green'
      },
      $messageHeader: {
        tr: {
          'text-align': 'left'
        }
      }
    };
  }

  getBody() {
    const message = this.logic.getMessage();
    const {flexDown, table, h4, p} = ui;
    if (!message) {
      return flexDown('nothing').class('messageClass');
    }
    return flexDown().class('messageClass').child(
      table().class('messageHeader').child(
        trThTd('from', message.from),
        trThTd('to', message.to),
        trThTd('date', message.date.toLocaleDateString())
      ),
      h4(message.subject),
      p(message.body)
    );
  }

}

export {isMessageSelected, getMailboxes, getSelectedMailbox} from './main';
import {goto} from '../noml';

export function gotoMessage(mailboxId, messageId) {
  goto(mailboxId + '/' + messageId);
}

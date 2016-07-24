import {Element} from './element';
import {Toast} from './toast';

export class InputField extends Element {

  _ref = true;
  _validator: () => Error;
  toast: Toast;

  constructor() {
    super('div');
    this.toast = new Toast();
  }

  validator(validator: () => Error): this {
    this._validator = validator;
    return this;
  }

  validate(): boolean {
    const e = this._validator();
    this.classIf(e, 'error');
    this.toast.showError(e);
    this.syncProps();
    return !e;
  }

}

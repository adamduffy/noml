import {Element} from './element';

export class Input extends Element {

  constructor(type: string, value?: string, valueChanged?: (v) => void) {
    super("input");
    this.prop({type});
    if (value !== undefined) {
      this.prop({value});
    }
    if (valueChanged) {
      this.onChange(ev => valueChanged(ev.target.value));
    }
  }

  autocomplete(on: boolean): this {
    return this.prop({autocomplete: (on ? "on" : "off")});
  }

  getValue() {
    return this.dom.value;
  }

  setValue(value: string) {
    this.dom.value = value;
  }

  focus() {
    this.dom.focus();
  }

}

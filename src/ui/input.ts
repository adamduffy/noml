import {Element} from './element';

export class Input extends Element {

  constructor(type: string, value?: string, valueChanged?: (v) => any) {
    super("input");
    this.prop({type});
    if (value !== undefined) {
      this.prop({value});
    }
    if (valueChanged) {
      this.onValueChanged(valueChanged);
    }
  }

  autocomplete(on: boolean): this {
    return this.prop({autocomplete: (on ? "on" : "off")});
  }

  onChange(callback: (e) => void): this {
    return this.event({change: callback});
  }

  onValueChanged(callback: (v) => any): this {
    return this.onChange(e => callback(e.target.value));
  }

  getValue(): string {
    return this.dom.value;
  }

  setValue(value: string): void {
    this.dom.value = value;
  }

  focus(): void {
    this.dom.focus();
  }

}

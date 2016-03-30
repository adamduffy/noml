import {Element} from './element.ts';

export class Form extends Element {

  constructor(...c) {
    super("form", c);
  }

  onSubmit(submit: (d: any) => any): this {
    return this.event({submit: (e) => {
      e.preventDefault();
      submit(e);
    }});
  }

}

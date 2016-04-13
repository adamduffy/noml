import {ui} from '../noml.ts';

export class Container extends ui.Component<void, any> {

  constructor(...c) {
    super();
    this.name = "div";
    this.id = "main";
    this.child(c);
  }

}

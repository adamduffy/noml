import {mergeStyles, renderComponent} from '../';
import {Element} from './element';

export class Component<L, S> extends Element {

  _ref = true;
  logic: L;
  _style: any;

  constructor(logic?: L, id?: string) {
    super('component');
    this.logic = logic;
    this.id = id;
    this._style = this.getDefaultStyle();
    this.initialize();
  }

  initialize(): void { }

  style(style: S): this {
    mergeStyles(this._style, style);
    return this;
  }

  getDefaultStyle(): S {
    return {} as S;
  }

  getStyle(): S {
    return this._style;
  }

  getBody(): any {
    return this.children;
  }

  getLoadingBody(): any { };

  render(): void {
    renderComponent(this);
  }

}

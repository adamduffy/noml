import {mergeStyles, renderComponent} from '../noml';
import {Element} from './element.ts';

export class Component<D, L, S> extends Element {

  _ref = true;
  dataSource: () => D;
  logic: L;
  _style: any;

  constructor(dataSource?: () => D, logic?: L, id?: string) {
    super('component');
    this.dataSource = dataSource;
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

  setDataSource(dataSource): this {
    this.dataSource = dataSource;
    return this;
  }

  setLogic(logic: L): this {
    this.logic = logic;
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

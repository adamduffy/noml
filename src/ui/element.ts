import {renderElement, syncProps} from '../noml.ts';

export class Element {

  id: string;
  name: string;
  classes: string[] = [];
  props: {} = {};
  events: any[] = [];
  children: any[] = [];
  _ref: boolean;
  dom: any;

  constructor(name: string, children?: any) {
    this.name = name;
    if (children) {
      this.child(children);
    }
  }

  reload() {
    this.render();
  }

  ref(ref: boolean = true): this {
    this._ref = ref;
    return this;
  }

  setId(id: string): this {
    this.id = id;
    return this;
  }

  class(classNames: string): this {
    if (classNames.indexOf(' ') > -1) {
      classNames.split(' ').forEach(c => this.class(c));
    } else {
      if (this.classes.indexOf(classNames) === -1) {
        this.classes.push(classNames);
      }
    }
    return this;
  }

  classIf(condition: any, classNames: string): this {
    if (!!condition) {
      this.class(classNames);
    } else {
      this.unclass(classNames);
    }
    return this;
  }

  unclass(classNames: string): this {
    if (classNames.indexOf(' ') > -1) {
      classNames.split(' ').forEach(c => this.unclass(c));
    } else {
      const i = this.classes.indexOf(classNames);
      if (i > -1) {
        this.classes.splice(i, 1);
      }
    }
    return this;
  }

  toggle(condition: boolean, trueClass: string, falseClass?: string): this {
    if (!!condition) {
      return this.unclass(falseClass).class(trueClass);
    }
    return this.unclass(trueClass).class(falseClass);
  }

  event(e: any): this {
    this.events.push(e);
    return this;
  }

  onClick(callback: (e) => void) {
    return this.event({click: callback});
  }

  onChange(callback: (e) => void) {
    return this.event({change: callback});
  }

  prop(...props): this {
    Array.from(props, p => Object.assign(this.props, p));
    return this;
  }

  unprop(key): this {
    delete this.props[key];
    return this;
  }

  propIf(condition, ...props): this {
    if (condition) {
      this.prop(props);
    }
    return this;
  }

  xchild(...args): this {
    this.children.length = 0;
    return this.child(args);
  }

  child(...args): this {
    Array.from(args, child => {
      if (child instanceof Array) {
        child.forEach(c => this.children.push(c));
      } else {
        this.children.push(child);
      }
    });
    return this;
  }

  syncProps(): void {
    if (!this.dom) {
      return;
    }
    syncProps(this);
  }

  render(): void {
    renderElement(this);
  }

}

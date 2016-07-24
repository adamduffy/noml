import {Element} from './element';
import {Input} from './input';
import {Form} from './form';

export function span(...c) { return new Element('span', c); }
export function div(...c) { return new Element('div', c); }
export function label(...c) { return new Element('label', c); }
export function table(...c) { return new Element('table', c); }
export function ul(...c) { return new Element('ul', c); }
export function li(...c) { return new Element('li', c); }
export function tr(...c) { return new Element('tr', c); }
export function th(...c) { return new Element('th', c); }
export function td(...c) { return new Element('td', c); }
export function h1(...c) { return new Element('h1', c); }
export function h2(...c) { return new Element('h2', c); }
export function h3(...c) { return new Element('h3', c); }
export function h4(...c) { return new Element('h4', c); }
export function p(...c) { return new Element('p', c); }

export function flexRight(...c) { return new Element('div', c).class('flex-right'); }
export function flexDown(...c) { return new Element('div', c).class('flex-down'); }
export function flexLeft(...c) { return new Element('div', c).class('flex-left'); }
export function flexUp(...c) { return new Element('div', c).class('flex-up'); }
export function flexPad(...c) { return new Element('div', c).class('flex-pad'); }

export function form(...c) {
  return new Form(c);
}

export function a(text: string | Element, href: string, target?: string) {
    return new Element('a', text)
      .prop({href})
      .propIf(target, {target});
}

export function input(type: string, value?: string, changed?: (v) => void) {
  return new Input(type, value, changed);
}

export function button(caption: string, click?: () => void) {
  const e = new Element('button', caption);
  if (click) {
    e.onClick(click);
  }
  return e;
}

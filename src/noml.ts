import * as ui from './ui';
export {ui};
export {Event} from './event.ts';

interface NoElement extends ui.Element {
  appliedEvents?: any[];
}
type Component = ui.Component<any, any, any>;

type DomTypes = Element | Element[] | Text;
type Domish = DomTypes | DomTypes[];

let styles: any = {};
let isPageRendering = false;
let autoId: number = 0;

export function reset(): void {
  styles = {};
  autoId = 0;
}

export function goto(hash: string): void {
  window.location.hash = hash || '';
}

function removeChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function renderPage(o: any): void {
  reset();
  isPageRendering = true;
  const body = render(o);
  removeChildren(document.body);
  appendChildren(document.body, body);
  applyStyles();
  isPageRendering = false;
}

function create(name: string): HTMLElement {
  return document.createElement(name);
}
function domText(text: string): Text {
  return document.createTextNode(text);
}

export function render(o: any): Domish {
  if (o === undefined) {
    return domText('[undefined]');
  } else if (o instanceof String || typeof o === 'string') {
    return domText(o);
  } else if (o instanceof Number || typeof o === 'number') {
    return domText(o.toString());
  } else if (o instanceof Array) {
    return renderArray(o);
  } else if (o instanceof ui.Component) {
    return renderComponent(o as Component);
  } else if (o instanceof ui.Element) {
    return renderElement(o as NoElement);
  } else {
    return;
  }
}

function applyEvents(e: NoElement, dom: HTMLElement) {
  e.events.forEach(event => {
    if (!e.appliedEvents.find(applied => event)) {
      for (let name in event) {
        if (name.indexOf('$') === 0) {
          name = name.substr(1);
        }
        dom.addEventListener(name, event[name]);
      }
      e.appliedEvents.push(event);
    }
  });
}

export function mergeStyles(dest: any, source: any): void {
  for (let k in source) {
    dest[k] = dest[k] || {};
    for (let v in source[k]) {
      if (source[k][v] instanceof Object) {
        dest[k][v] = dest[k][v] || {};
        for (let v2 in source[k][v]) {
          dest[k][v][v2] = source[k][v][v2];
        }
      } else {
        dest[k][v] = source[k][v];
      }
    }
  }
}

export function applyStyles() {
  const sheet = styleToStyleSheet(styles);
  const styleElement: any =
    document.head.getElementsByTagName('style')[0] ||
    document.head.appendChild(document.createElement('style'));
  if (styleElement.innerHTML !== sheet) {
    styleElement.innerHTML = '';
    styleElement.innerHTML = sheet;
  }
}

function styleToStyleSheet(styles: any) {
  let css = '';
  for (let id in styles) {
    const ids = styles[id];
    let repeatWithState = false;
    for (let sel in ids) {
      const values = ids[sel];
      sel = sel.replace('$', '.');
      css += `#${id} ${sel} {\n`;
      for (let style in values) {
        if (values[style] instanceof Object) {
          repeatWithState = true;
        } else {
          css += '\t' + style.replace('_', '-') + ':' + values[style] + ';\n';
        }
      }
      css += '}\n';
    }
    if (repeatWithState) {
      for (let sel in ids) {
        const values = ids[sel];
        sel = sel.replace('$', '.');
        for (let styleAsState in values) {
          if (values[styleAsState] instanceof Object) {
            const states = values[styleAsState];
            css += `#${id} ${sel}${styleAsState} {\n`;
            for (let stateKeys in states) {
              css += '\t' + stateKeys.replace('_', '-') + ':' + states[stateKeys] + ';\n';
            }
            css += '}\n';
          }
        }
      }
    }
  }
  return css;
}

function renderArray(a: any[]): Domish {
  let dom = [];
  a.forEach(o => dom.push(render(o)));
  return dom;
}

export function renderComponent(c: Component, body?: any): HTMLElement {
  body = body || c.getBody();
  if (body instanceof Promise) {
    body.then(
      (newBody: any) => renderComponent(c, newBody),
      (error: any) => renderComponent(c, error)
    );
    body = c.getLoadingBody();
  }
  if (body instanceof Array) {
    c.children = body;
  } else {
    c.children = [body];
  }
  const dom = renderElement(c);
  const s = c.getStyle();
  styles[c.id] = styles[c.id] || {};
  mergeStyles(styles[c.id], s);
  if (!isPageRendering) {
    applyStyles();
  }
  return dom;
}

export function renderElement(e: NoElement): HTMLElement {
  if (!e.dom) {
    e.appliedEvents = [];
  }
  const dom = e.dom || create(e.name);
  if (e._ref) {
    e.dom = dom;
    if (!e.id) {
      e.id = '_' + autoId++;
    }
  }
  syncProps(e, dom);
  applyEvents(e, dom);
  let newChildren: Domish;
  if (e.children.length > 0) {
    newChildren = render(e.children);
  }
  removeChildren(dom);
  if (newChildren) {
    appendChildren(dom, newChildren);
  }
  return dom;
}

function appendChildren(parent: HTMLElement, children: Domish) {
  if (children instanceof Array) {
    children.forEach(c => appendChildren(parent, c));
  } else {
    parent.appendChild(children);
  }
}

export function syncProps(e: NoElement, dom?: Element): void {
  if (!dom) {
    dom = e.dom;
  }
  const attr = dom.attributes;
  for (let i = 0; i < attr.length; i++) {
    const name = attr[i].nodeName;
    if (!e.props[name] ||
      (name === 'id' && !e.id) ||
      (name === 'class' && e.classes.length === 0)) {
      dom.removeAttribute(attr[i].nodeName);
    }
  }
  if (e.id !== attr['id']) {
    dom.setAttribute('id', e.id);
  }
  if (e.classes.length > 0) {
    const className = e.classes.join(' ');
    if (className !== attr['class']) {
      dom.setAttribute('class', className);
    }
  }
  for (let key in e.props) {
    dom.setAttribute(key, e.props[key]);
  }
}

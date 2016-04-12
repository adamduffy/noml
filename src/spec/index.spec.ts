import {expect, use} from 'chai';
import * as noml from '../noml.ts';
import {ui} from '../noml.ts';

function expectBody(html: string) {
  expect(document.body.innerHTML).to.equal(html);
}

describe('noml', () => {

  it('renders a span', () => {
    const result = noml.render(ui.span('this is a span')) as HTMLElement;
    expect(result.outerHTML).to.equal('<span>this is a span</span>');
  });

  it('turns id into a discoverable id', () => {
    noml.renderPage(ui.span('welcome to noml').setId('mySpanId'));
    const elem = document.getElementById('mySpanId');
    expect(elem).to.not.be.null;
  });

  it('renders child elements', () => {
    const div = ui.div(
      ui.span('span 1'),
      ui.span('span 2')
    );
    const result = noml.render(div) as HTMLElement;
    expect(result.outerHTML).to.equal('<div><span>span 1</span><span>span 2</span></div>');
  });

  it('adds and dedupes class names', () => {
    const span = ui.span('a very classy span')
        .class('myClass1 myClass2')
        .class('myClass2 myClass3');
    const result = noml.render(span) as HTMLElement;
    expect(result.className).to.equal('myClass1 myClass2 myClass3');
  });

  it('wires and invokes the click event', () => {
    let clicked = false;
    const span = ui.span('click here!')
      .setId('testId')
      .onClick(() => clicked = true);
    noml.renderPage(span);
    const result = document.getElementById('testId');
    result.click();
    expect(clicked).to.equal(true);
  });

  class TestComponent extends ui.Component<any, any, any> {
    getBody() {
      return ui.span('test span').class('myClass');
    }
    getDefaultStyle() {
      return {
        $myClass: {
          color: 'red'
        }
      };
    }
  }

  class PromiseComponent extends ui.Component<any, any, any> {
    testPromise = Promise.resolve(ui.span('this is a resolved promise'));
    getBody() {
      return this.testPromise;
    }
    getLoadingBody() {
      return ui.span('loading');
    }
  }

  it('renders component.getBody()', () => {
    const myComponent = new TestComponent();
    noml.renderPage(myComponent);
    expectBody('<component id="_0"><span class="myClass">test span</span></component>');
  });

  it('renders component.getBody() as Promise', () => {
    const promiseComponent = new PromiseComponent();
    noml.renderPage(promiseComponent);
    expectBody('<component id="_0"><span>loading</span></component>');
    return promiseComponent.testPromise.then(() => {
      expectBody('<component id="_0"><span>this is a resolved promise</span></component>');
    });
  });

  it('applies styles', () => {
    const testComponent = new TestComponent();
    noml.renderPage(testComponent);
    const elem = document.querySelector('.myClass');
    const style = getComputedStyle(elem);
    expect(style.color).to.equal('rgb(255, 0, 0)');
  });

});

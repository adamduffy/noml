export {styles} from './styles.ts';
export {Input} from './input.ts';
export {InputField} from './inputField.ts';
export {Component} from './component.ts';
export {Element} from './element.ts';
export {Tristate} from './tristate.ts';
export {Option} from './option.ts';
export {Listbox} from './listbox.ts';
export {Select} from './select.ts';
export {Toast} from './toast.ts';
export * from './common.ts';

export function delayedPromise(resolveFunc, fail?, ms?) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fail ? reject(resolveFunc()) : resolve(resolveFunc());
    }, ms || 1000);
  });
}

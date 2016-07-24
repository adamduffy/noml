export {styles} from './styles';
export {Input} from './input';
export {InputField} from './inputField';
export {Component} from './component';
export {Element} from './element';
export {Tristate} from './tristate';
export {Option} from './option';
export {Listbox} from './listbox';
export {Select} from './select';
export {Toast} from './toast';
export * from './common';

export function delayedPromise(resolveFunc, fail?, ms?) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fail ? reject(resolveFunc()) : resolve(resolveFunc());
    }, ms || 1000);
  });
}

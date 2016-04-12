export function classIf(condition: boolean, className: string, falseName?: string): any {
  if (condition) {
    return {_class: className};
  } else if (falseName) {
    return {_class: falseName};
  } else {
    return {};
  }
}

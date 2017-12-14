/* @flow */
import _f from 'lodash/fp';

const trueKeys = _f.pipe(
  _f.toPairs,
  _f.filter(_f.last),
  _f.map(_f.first),
)

function classesToArray(classes): string[] {
  if (Array.isArray(classes)) {
    return classes
  }
  else if (['string', 'function'].includes(typeof classes)) {
    return [classes.toString()]
  } 
  else if (typeof classes === 'object') {
    return trueKeys(classes)
  }
  else {
    return []
  }
}

export function bem(baseName: string, and: string[] = [], modifiers: string[] = []) {
  const out = (elem: string) => 
    bem(`${baseName}__${elem}`)

  out.and = (classes) =>
    bem(baseName, and.concat(classesToArray(classes)), modifiers)

  out.mod = classes => {
    const newModifiers = classesToArray(classes).map(mod => `${baseName}--${mod}`)

    return bem(baseName, and, modifiers.concat(newModifiers))
  }

  // $FlowFixMe
  out.toString = () =>
    [baseName]
      .concat(and)
      .concat(modifiers)
      .join(' ')


  out.baseName = baseName

  return out
}

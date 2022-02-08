import _ from 'lodash'

function customizer(objValue: any, srcValue: any) {
  if (_.isObject(objValue)) {
    return srcValue
  }
}

export const deepMerge = (target: any, source: any) => {
  const assign = Object.assign({}, _.mergeWith(target, source, customizer))
  return assign
}
export {
  isBoolean,
  isNumber,
  isFunction,
  isString,
  isObject,
  isClient
} from '@vueuse/core'

export const isUndefined = (val: any): val is undefined => val === undefined
export const isArray = Array.isArray

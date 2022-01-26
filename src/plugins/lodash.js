import {isArray, isObject, mapKeys, mapValues} from 'lodash';

let mapKeysDeep = (obj, cb) => {
  if (isArray(obj)) {
    return obj.map(innerObj => mapKeysDeep(innerObj, cb));
  } else if (isObject(obj)) {
    return mapValues(
      mapKeys(obj, cb),
      val => mapKeysDeep(val, cb),
    )
  } else {
    return obj;
  }
};
export {mapKeysDeep};

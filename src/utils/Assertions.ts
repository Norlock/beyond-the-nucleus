const isEqual = (object1: any, object2: any): boolean => {
    return object1 === object2
}

const isDefined = (object: any): boolean => {
    return typeof object !== 'undefined';
}

const isUndefined = (object: any): boolean => {
    return typeof object === 'undefined';
}

const isANumber = (object: any): boolean => {
    return Number.isFinite(object);
}

const isAString = (object: any): boolean => {
    return typeof object === 'string';
}

export const assert = {
    isEqual,
    isDefined,
    isUndefined,
    isANumber,
    isAString
}

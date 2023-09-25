/**
 * @function
 * @param {String} entity - entity name
 * @param {String} value - key target value
 * @return {String}
 * */
export function getTableKey(entity, value) {
    return `${entity}_${value}`
}

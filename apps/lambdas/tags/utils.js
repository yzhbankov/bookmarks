/**
 * @function
 * @param {TagCreateDto} tag - tag data
 * @return {Object<pkValue: String, skValue: String>}
* */
export function getPkSkForTag(tag) {
    return {
        pkValue: `TAG_${tag.owner}`,
        skValue: `TAG_${tag.name}`
    }
}

/**
 * @function
 * @param {String} owner
 * @return {String}
 * */
export function getPkForOwner(owner) {
    return `TAG_${owner}`
}

/**
 * @function
 * @param {String} name
 * @return {String}
 * */
export function getSkForName(name) {
    return `TAG_${name}`
}

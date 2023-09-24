/**
 * @function
 * @param {SpaceCreateDto} space - space data
 * @return {Object<pkValue: String, skValue: String>}
* */
export function getPkSkForSpace(space) {
    return {
        pkValue: `SPACE_${space.owner}`,
        skValue: `SPACE_${space.name}`
    }
}

/**
 * @function
 * @param {String} owner
 * @return {String}
 * */
export function getPkForOwner(owner) {
    return `SPACE_${owner}`
}

/**
 * @function
 * @param {String} name
 * @return {String}
 * */
export function getSkForName(name) {
    return `SPACE_${name}`
}

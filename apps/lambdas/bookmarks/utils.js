/**
 * @function
 * @param {BookmarkDto} bookmark - bookmark data
 * @return {Object<pkValue: String, skValue: String>}
* */
export function getPkSkForBookmark(bookmark) {
    return {
        pkValue: `BOOKMARK_${bookmark.owner}`,
        skValue: `BOOKMARK_${bookmark.url}`
    }
}

/**
 * @function
 * @param {String} owner
 * @return {String}
 * */
export function getPkForOwner(owner) {
    return `BOOKMARK_${owner}`
}

/**
 * @function
 * @param {String} url
 * @return {String}
 * */
export function getSkForUrl(url) {
    return `BOOKMARK_${url}`
}

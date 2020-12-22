/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * @param {*} data - The data to check
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 */
const isNumber = data => typeof data == 'number'


/**
 * Checks if `data` is a `String`
 *
 * @param {*} data - The data to check
 * @returns {boolean} Returns `true` if `data` is a string, else `false`
 */
const isString = data => typeof data === 'string'


/**
 * Checks if `data` is an external URL
 *
 * @param {*} data - The data to check
 * @returns {boolean} Returns `true` if `data` is an external URL, else `false`
 */
const isURL = data => isString(data) && /(http(s)?:\/\/)?(www\.)?[\w\u0430-\u044f]*\.[\w\u0430-\u044f]{2,3}/ig.test(data)


export { isNumber, isString, isURL }

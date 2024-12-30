
/**
 * Check if a variable is of a specifig type
 * @param type 
 * @param variable 
 * @returns 
 */
export function is_typeof(type :any, variable :any) :boolean {
    return typeof type === variable
}


export function is_string(variable :any)  { 
    return is_typeof('string', variable)  
}


export function is_number(variable :any) { 
    return is_typeof('number', variable) && !isNaN(variable)
}


export function is_number_any(number :any) {
    return !isNaN(parseInt(number))
}


export function is_array(variable :any)  { 
    return Array.isArray(variable)
}


export function is_object(variable :any) { 
    return is_typeof('object', variable)  &&  !is_array(variable)
}



/**
 * Checks if a variable is nullish (undefined, null, 0, '0', or empty string).
 * @param {*} variable 
 * @returns {boolean}
 */
export function is_nullish(variable) {
    try {
        if (
            variable === undefined || variable === 'undefined'
            || variable === null   || variable === 'null'
            || variable === 0      || variable === '0'
            || variable === ''
        ) 
        return true
    } catch (error) {
        console.error(error)
    }
    return false;
}



/**
 * Checks if a variable is empty.
 * @param {*} variable 
 * @returns {boolean}
 */
export function is_empty(variable :any) {
    try {
        if (
            is_nullish(variable)
            || is_array(variable)  && variable.length == 0
            || is_object(variable) && Object.keys(variable).length == 0
            || is_string(variable) && variable == ''
            || variable.toString() && variable == ''
        ) 
        return true
    } catch (error) {
        console.error(error)
    } 
    return false;
}



/**
 * Converts a value to boolean. No matter if int, bool, empty(=false)
 * @param {*} value 
 * @returns {boolean}
 */
export function get_boolean(value :any) {
    try {
        if (
            !is_empty(value)
            || value === true || value === 'true'
            || value === 1    || value === '1'
        ) 
        return true
    } catch (error) {
        console.error(error)
    }
    return false
}
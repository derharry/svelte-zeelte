/**
 * Generates a tiny-id. 
 * imitating PHP tinyid()
 * @param {number} length 
 * @returns string
 */
export function tinyid(length :number = 8) :string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}



/**
 * Generates a uuid. 
 * Alias for crypto.randomUUID()
 * @param {number} length 
 * @returns string
 */
export function uuid() :string {
    return crypto.randomUUID()
}
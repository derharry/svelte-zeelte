

/**
 * Convert KB to MB to readable format
 * @param kilobytes 
 * @param decimals 
 * @returns 
 */
export function convert_kb2Mb(kilobytes :number, decimals :number = 0) :number {
    const megabytes = kilobytes / 1024 / 1024;
    if (decimals === 0)
        return megabytes;
    return Number( megabytes.toFixed(decimals) );
}

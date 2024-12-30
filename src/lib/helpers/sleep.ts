/**
 * Sleep for ? seconds
 * Example: await sleep(1)
 * @param {int} seconds
 * @return void
 */
export async function sleep(seconds :number = 1) :Promise<void> {
    if (seconds <= 0) 
        return
    await sleepMS(seconds * 1000)
}



/**
 * Sleep for ? milliseconds
 * Example: await sleepMS(500)
 * @param {int} millisconds
 * @return void
 */
export async function sleepMS(millisconds :number = 1) :Promise<void> {
    if (millisconds <= 0) 
        return
    await new Promise( resolve => setTimeout(resolve, millisconds) )
}
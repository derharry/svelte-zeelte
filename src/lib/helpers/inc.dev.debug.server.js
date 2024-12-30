import fs   from 'fs/promises';
import path from 'path';
import { getDatestamp, getTimestamp } from "../datetime/time"
import { browser } from '$app/environment';


/**
 * Default error handling 
 * @param {Error} error 
 * @returns Object { success: false, error: message, stack: stack }
 */
export async function handle_server_error(error) {
    try {

        // prepare error message
        let error_msg = []
        error_msg.push('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
        error_msg.push(`!! ERROR  ${getDatestamp()}  ${getTimestamp()}`)
        error_msg.push(error.message)
        error_msg.push(error.stack)
        error_msg.push('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')

        // output error message
        console.error(error_msg.join("\n"))

        // append error message to file:
        if (!browser) {
            const logFile = path.join(process.cwd(), '_error.log'); //console.log(logFile)
            await fs.appendFile(logFile, error_msg.join("\n"));
        }

        return {
            success: false,
            error:   error.message,
            stack:   error.stack
        }
    } catch (error) {
        console.error(error.message)
        console.error(error.stack)
        return {
            success: false,
            error:   error.message,
            stack:   error.stack
        }
    }
}
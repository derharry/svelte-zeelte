import { getDatestamp, getTimestamp } from "../datetime/time"


export function debug_start(debug, name) {
    if (!debug) return;
    //console.log('#####################################################');
    //console.log('#### ' + name);
}


export function debug_end(debug, name) {
    if (!debug) return;
    //console.log('//// ' + name);
    //console.log('#####################################################');
}

export function debug_info(debug, info) {
    if (!debug) return;
    //console.log(' !   ' + {info});
}

export function debug_state(debug, info) {
    if (!debug) return;
    //console.log('  >> ' + info);
}

export function debug_error(debug, error) {
    if (!debug) return;
    console.log(' !!!! exp_error ' + {error});
}

export function debug_var(debug, name, variable) {
    if (!debug) return;
    //console.log('  @@ ', name, {variable})
    //debug_vardump(debug, name, variable);
}

/*
function debug_vardump(debug, name, variable, level = 0) {
    try {
        if (!debug) return;

        if (typeof variable === 'object' && variable !== null) {
            //console.log('  @ ' + name + ' {object} ');
            debug_vardump(debug, name, Object.assign({}, variable), level);
        } else if (Array.isArray(variable)) {
            //console.log('  @ ' + name + ' [array] ');
            level += 1;
            variable.forEach((value, key) => {
                if (Array.isArray(value)) {
                    debug_vardump(debug, key, value, level + 1);
                } else {
                    debug_vardump(debug, key, value, level);
                }
            });
        } else {
            let levelStr = '  ';
            for (let i = 0; i < level; i++) {
                levelStr += levelStr; // Indent based on level
            }
            //console.log(levelStr + ' @ ' + name + ': ' + variable);
        }
    } catch (error) {
        handle_exception(error, 'debug_vardump');
    }
}
*/

/**
 * Default error handling 
 * @param {Error} error 
 * @returns Object { success: false, error: message, stack: stack }
 */
export async function handle_error(error) {
    try {

        // prepare error message
        let error_msg = []
        error_msg.push('####################################')
        error_msg.push(`## ERROR  ${getDatestamp()}  ${getTimestamp()}`)
        error_msg.push(error.message)
        error_msg.push(error.stack)
        error_msg.push('####################################')

        // output error message
        console.error(error_msg.join("\n"))

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
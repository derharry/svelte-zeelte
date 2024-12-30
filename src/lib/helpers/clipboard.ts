import { is_string } from "./dev.js";


/**
 * Copy content to clipboard (currently only string)
 * @param 
 */
export function copyToClipboard(content :any) {
    try {

        if (is_string(content) || is_string(content.toString())) {  
            navigator.clipboard.writeText(content).then(() => {
                // Optional: Show a tooltip or notification that the text was copied
                //console.log('copied', content)
                return true
            }).catch(err => {
                console.error('Failed to copy: ', err);
                return false 
            });
        }

    } catch (error) {
        console.error(error)
    }
}
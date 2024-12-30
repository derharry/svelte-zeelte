
/**
 * 
 * @param format 
 * @returns 
 */
export function current_time(format :string = 'HH:mm:ss') :string {
    return format_datetime( new Date() , format );
}


export function current_date(format :string = 'YYYY-MM-DD') :string {
    return format_datetime( new Date() , format );
}

export function current_timestamp(format :string = 'YYYY-MM-DD HH:mm:ss') :string {
    return format_datetime( new Date() , format );    
}



export function format_datetime(datetime :Date, format :string = 'YYYY-MM-DD HH:mm') :string {
    try {
        const pad = (num :number) => num.toString().padStart(2, '0');
    
        const replacements :object = {
            YYYY:   date.getFullYear(),
            YY:     date.getFullYear().toString().slice(-2),
            MM:     pad( datetime.getMonth() + 1 ),
            DD:     pad( datetime.getDate()      ),
            HH:     pad( datetime.getHours()     ),
            mm:     pad( datetime.getMinutes()   ),
            ss:     pad( datetime.getSeconds()   )
        };
    
        return format.replace(/YYYY|YY|MM|DD|HH|mm|ss/g, match => replacements[match]);        
    } catch (error) {
        console.error({error})
    }
    return '00-00-0000'
}



export function formatDateUTC(datetime :Date, format :string = 'YYYY-MM-DD HH:mm') :string {
    try {
        const pad = (num :number) => num.toString().padStart(2, '0');
        
        const replacements :object = {
            YYYY:   date.getUTCFullYear(),
            YY:     date.getUTCFullYear().toString().slice(-2),
            MM:     pad( datetime.getUTCMonth() + 1 ),
            DD:     pad( datetime.getUTCDate()      ),
            HH:     pad( datetime.getHours()     ),
            mm:     pad( datetime.getMinutes()   ),
            ss:     pad( datetime.getSeconds()   )
        };
        
        return format.replace(/YYYY|YY|MM|DD|HH|mm|ss/g, match => replacements[match]);         
    } catch (error) {
        console.error({error})
    }
    return '00-00-0000'
}
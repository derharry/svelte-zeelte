import mysql from 'mysql2/promise'
//import { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } from "$lib/env.private"
import { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } from '$env/static/private'
import { debug_end, debug_start } from '../helpers/inc.dev.debug.public';
import { is_empty } from '../helpers/inc.dev';
import { handle_server_error } from '../helpers/inc.dev.debug.server';


export function current_timstamp() {
    
}


export const formatDateTime = (mysqlDateTime) => {
    const date = new Date(mysqlDateTime);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };


class Zeelte_DB_MySQL {
    
    constructor() {
        this.host = MYSQL_HOST
        this.username = MYSQL_USER
        this.password = MYSQL_PASSWORD
        this.database = MYSQL_DATABASE
        this.dbcon = null
        this.lastError = null
    }


    async connect() {
        if (!this.dbcon) {
            try {
                this.dbcon = await mysql.createConnection({
                    host: this.host,
                    user: this.username,
                    password: this.password,
                    database: this.database
                })
                await this.dbcon.ping()
            } catch (error) {
                this.lastError = error
                console.error('connect()', error)
                throw error
            }
        }
        return true
    }

    async close() {
        try {
            //if (this.dbcon)
                //this.dbcon.destroy()
        }
        catch (e)
        {
            // do nothing :-)
        }
    }

    getLastError() {
        return this.lastError
    }

    // we use default javascript prepared_statement to avoid SQL-injections
    async query(sql, params) {
        let debug = false
        debug_start(debug, 'db.mysql/query()')
        if (is_empty(sql))
            throw('Empty SQL string')
        try {
            await this.connect()
            //console.log('db.query( '+ sql +', ', {params}, ')')
            //this.dbcon.query('SELECT SLEEP(2)');
            // dev
            /*
                    const res = await this.dbcon.query(sql, params);
                    //console.log('..............................................................')
                    //console.log(res)
                    //console.log('..............................................................')
            */
            // org
            const [rows, fields] = await this.dbcon.query(sql, params);
            return rows; // Return just the rows
        } catch (error) {
            this.lastError = error
            handle_server_error(error)
            throw error
        } finally {
            debug_end(debug, 'db.mysql/query()')
        }
    }
 
    prepare_statement(sql, params) {
        try {
            // If params is not an array, convert it to 
            if (!Array.isArray(params)) {
                params = [params];
            }
    
            // Count the number of placeholders in the SQL
            const placeholderCount = (sql.match(/\?/g) || []).length;
    
            // Ensure the number of params matches the number of placeholders
            if (placeholderCount !== params.length) {
                throw new Error(`Mismatch between number of placeholders (${placeholderCount}) and number of parameters (${params.length})`);
            }
    
            // Return an object with the prepared SQL and params
            return {
                sql: sql,
                params: params
            };
        } catch (error) {
            this.lastError = error;
            console.error('prepare_statement()', error);
            throw error;
        }
    }


    prepare_set(data) {
        try {
            if (data && (Array.isArray(data) || typeof data === 'object')) {
                const setData = [];
    
                if (Array.isArray(data)) {
                    data.forEach(item => {
                        if (typeof item === 'object') {
                            Object.entries(item).forEach(([key, value]) => {
                                setData.push(`${key} = ?`);
                            });
                        }
                    });
                } else {
                    Object.entries(data).forEach(([key, value]) => {
                        setData.push(`${key} = ?`);
                    });
                }
    
                return setData.join(', ');
            }
            return '';
        } catch (error) {
            this.lastError = error;
            console.error('prepare_set()', error);
            throw error;
        }
    }

    prepared_sql(sql, data) {
        const values = Array.isArray(data) ? data : Object.values(data);
        let index = 0;

        return sql.replace(/\?/g, () => {
            if (index < values.length) {
                const value = values[index++];
                return value === null ? 'NULL' : `'${String(value).replace(/'/g, "''")}'`;
            }
            return '?'; // Leave ? if not enough values
        });
    }

    async select(tablename, fields = [], where = [], orderby = [], limit = '') {
        try {
            //console.log('db.select()');
            // reset fields if its a string or empty array
            if (typeof(fields) === 'string') fields = [fields]
            if (typeof(where)  === 'string') where  = [where]
            if (fields.length == 0) fields = ['*']
            // put arrays to SQL strings
            const fields_  = fields.join(',')
            const where_   = where.join (',')
            const orderby_ = orderby.join(',')
            const limit_   = limit == '' ? '' : 'LIMIT '+ limit

            // prepare SQL statement
            const sql = [`SELECT ${fields_} FROM ${tablename}`]
            if (where_   != '') sql.push(`WHERE ${where_}`)
            if (orderby_ != '') sql.push(`ORDER BY ${orderby_}`)
            if (limit_   != '') sql.push(`LIMIT ${limit_}`)
            const sql_str = sql.join(' ')
            //console.log(' - ', sql_str);

            // execute and return
            const res = await this.query(sql_str)
            //console.log(' - ', res);
            return {
                success: true,
                data: res
            }
        } catch (error) {
            this.lastError = error;
            console.error('insert()', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async insert(tablename, data) {
        try {
            const sql_set = this.prepare_set(data);
            const sql = `INSERT INTO ${tablename} SET ${sql_set};`;
            const values = Object.values(data);

            // Log the SQL query and values
            //console.log('SQL Query:', sql);
            //console.log('Values:', values);            
            //console.log('SQL Query:', this.prepared_sql(sql, data));

            // Execute the insert query
            const result = await this.query(sql, values);

            // Check if result is an object with affectedRows property
            if (result && typeof result === 'object' && 'affectedRows' in result) {
                if (result.affectedRows > 0) {
                    // Check and fetch the inserted data by ID
                    const selectSql = `SELECT * FROM ${tablename} WHERE id = ?;`;
                    //console.log('Select SQL:', selectSql, result.insertId);
                    const newItems = await this.query(selectSql, [result.insertId]);
                    
                    // Return true and the new data
                    return {
                        success: true,
                        data: newItems[0] // Assuming the first item is the newly inserted one
                    };
                } else {
                    throw new Error('Insert operation failed: No rows affected');
                }
            } else {
                throw new Error('Unexpected result format from insert operation');
            }
        } catch (error) {
            this.lastError = error;
            console.error('insert()', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async update(tablename, data, where) {
        try {
            const sql_set = this.prepare_set(data);
            const sql     = `UPDATE ${tablename} SET ${sql_set} WHERE ${where}`;
            const values    = Object.values(data);

            // Execute the insert query
            const result = await this.query(sql, values);
            return {
                success: true,
                data: result[0]
            }
        } catch (error) {
            this.lastError = error;
            console.error('update()', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async delete(tablename, where) {
        try {
            const sql = `DELETE FROM ${tablename} WHERE ${where};`;
            //console.log('db.mysql.js/delte()')
            // Execute the delete query
            const result = await this.query(sql);
            //console.log('  - ', sql)
            //console.log('  - ', result)
            return {
                success: true,
                data: result
            }
        } catch (error) {
            this.lastError = error;
            console.error('delete()', error);
            return {
                success: false,
                error: error.message
            };
        }
    }


}

export default new Zeelte_DB_MySQL()

import fs, { existsSync } from 'fs'
import path from 'path'
import { path_exist } from './io.path.js'
import { sleep, sleepMS } from '../helpers/sleep.ts'






export async function file_exists(filename) {
    return await path_exist(filename)
}

export async function write_file(file_object, path) {
    try {
        fs.writeFileSync(file_object.name, file_object.arrayBuffer())
        return true
    } catch (error) {
        console.error({error})
        return false
    }
}
export async function rename_file(oldname, newname) {
    try {
        fs.renameSync(oldname, newname)
        return true
    } catch (error) {
        console.error({error})
        return false
    }
}

export async function delete_file(filename) {
    try {
        const exist = await file_exists(filename)
        if (exist) {
            await fs.unlinkSync(filename)
            const exists = await file_exists(filename)
            return !exists
        }
    } catch (error) {
        console.log('### delete error')
        console.error({error})
        return false
    }
    //console.log('#######//// delete file', filename)
}

export async function save_file_from_buffer(path, file) {
    try {
        await fs.writeFileSync(path, file);
        return true;
    } catch (error) {
        console.error({error});
        return false;
    }
}
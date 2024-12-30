import { access, mkdir, readdir, rmdir, rename } from "node:fs/promises";
//import { existsSync, mkdirSync } from 'fs';
import path from "node:path";
//import fs from "node:fs"

export async function directory_exists(filename) {
    return await path_exist(filename)
}


export async function create_folder(pathdir) {
    try {
        access(pathdir)
            .then(() => undefined)
            .catch(() => mkdir(path.join(process.cwd(), pathdir)))

        //await fs.mkdir(path);
        //console.log(`Folder created successfully at: ${path}`);
        return true;
    } catch (error) {
        console.error(`Error creating folder: ${error.message}`);
        return false;
    }
}

export async function rename_folder(path_now, path_new) {
    try {
        await rename(path_now, path_new);
        //console.log(`Folder renamed from ${path_now} to ${path_new}`);
        return true;
    } catch (error) {
        console.error(`Error renaming folder: ${error.message}`);
        return false;
    }
}

export async function delete_folder(pathdir) {
    try {
        await rmdir(pathdir)
            .then(() => {})
            .catch(() => mkdir(path.join(process.cwd(), pathdir)))
        //console.log(`Folder renamed from ${path_now} to ${path_new}`);
        return true;
    } catch (error) {
        console.error(`Error renaming folder: ${error.message}`);
        return false;
    }
}

export async function delete_folder_tree(pathdir) {
    try {
        //console.log(`Folder renamed from ${path_now} to ${path_new}`);
        return true;
    } catch (error) {
        console.error(`Error renaming folder: ${error.message}`);
        return false;
    }
}


export async function get_files_from_dir(dir) {
    return await readdir(dir);
}

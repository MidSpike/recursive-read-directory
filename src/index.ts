//------------------------------------------------------------//
//        Copyright (c) MidSpike, All rights reserved.        //
//------------------------------------------------------------//

import fs from 'node:fs';

import path from 'node:path';

//------------------------------------------------------------//

/**
 * Filters out directories and files that are unwanted.
 * @param directory_item a directory or file name (including extension)
 */
const default_item_filter = (directory_item: string) => !['node_modules', '.git', '.gitignore', '.env'].includes(directory_item);

//------------------------------------------------------------//

/**
 * Recursively goes through a directory to find files
 * @param directory_path the path to the directory (relative or absolute)
 * @param filter the filter used to include/exclude directories/files
 * @param _initial_directory_path the initial directory path (used for recursion)
 * @returns relative file paths inside of the `directory_path`
 */
export = function recursiveReadDirectory(
    directory_path: string,
    filter: (directory_item: string) => boolean = default_item_filter,
    _initial_directory_path: string | undefined = undefined,
) {
    const found_file_paths: string[] = [];

    if (!fs.existsSync(directory_path)) throw new Error(`Path does not exist: ${directory_path}`);
    if (!fs.statSync(directory_path).isDirectory()) throw new Error(`Path is not a directory: ${directory_path}`);

    if (!_initial_directory_path) _initial_directory_path = directory_path;

    const filtered_directory_items = fs.readdirSync(directory_path).filter(filter);
    for (const filtered_directory_item of filtered_directory_items) {
        const directory_item_path = path.join(directory_path, filtered_directory_item);

        if (fs.statSync(directory_item_path).isDirectory()) {
            const recursive_found_file_paths = recursiveReadDirectory(directory_item_path, filter, _initial_directory_path);
            found_file_paths.push(...recursive_found_file_paths);

            continue;
        }

        const relative_file_path = path.relative(_initial_directory_path, directory_item_path).replace(/\\/g, '/');
        found_file_paths.push(relative_file_path);
    }

    return found_file_paths;
}

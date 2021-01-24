'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Used to filter directories / files
 * @param {String} directory_item a file or directory
 */
const item_filter_default = (directory_item) => !['node_modules', '.git', '.gitignore', '.env'].includes(directory_item);

/**
 * Recursively goes through a directory to find files
 * @param {String} directory_path 
 * @param {Function} item_filter a filter used to include/exclude directories/files
 * @returns {Array<String>} relative file paths inside of the `directory_path`
 * 
 * @example
 * ```js
 * const item_filter = (directory_item) => !['node_modules', '.git', '.gitignore', '.env'].includes(directory_item)
 * recursiveReadDirectory(process.cwd(), item_filter);
 * ```
 */
module.exports = (directory_path, item_filter=item_filter_default) => {
    const found_files = [];

    function recursiveReadDirectory(recursive_directory_path) {
        if (fs.existsSync(recursive_directory_path)) {
            if (fs.statSync(recursive_directory_path).isDirectory()) {
                for (const filtered_directory_item of fs.readdirSync(recursive_directory_path).filter(item_filter)) {
                    recursiveReadDirectory(path.join(recursive_directory_path, filtered_directory_item));
                }
            } else {
                found_files.push(path.relative(directory_path, recursive_directory_path));
            }
        }

        return found_files;
    }

    return recursiveReadDirectory(directory_path);
};

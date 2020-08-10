const fs = require('fs');
const path = require('path');

/**
 * Recursively goes through a folder to find files
 * @param {String} root_directory_path 
 * @returns {Array<String>} relative file paths inside of the `root_directory_path`
 */
function recursiveReadDirectory(root_directory_path) {
    // Don't expose internal function parameters
    function _recursiveReadDirectory(root_directory_path, file_filter=((item) => item[0] !== '.'), found_files=[], recursive_path='') {
        const directory_item_path = path.join(root_directory_path, recursive_path);
        if (fs.existsSync(directory_item_path)) {
            if (fs.statSync(directory_item_path).isDirectory()) {
                const directory_items = fs.readdirSync(directory_item_path);
                const filtered_directory_items = directory_items.filter((item, index) => file_filter(item, index, directory_item_path));
                for (const filtered_directory_item of filtered_directory_items) {
                    const child_directory_item_path = path.join(recursive_path, filtered_directory_item);
                    _recursiveReadDirectory(root_directory_path, file_filter, found_files, child_directory_item_path);
                }
            } else {
                found_files.push(recursive_path);
            }
        }
        return found_files;
    }
    return _recursiveReadDirectory(root_directory_path);
}

module.exports = recursiveReadDirectory;
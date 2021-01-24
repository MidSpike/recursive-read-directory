'use strict';

const fs = require('fs');
const path = require('path');

/**
 * recursively goes through a directory to find files
 * @param {String} directory_path 
 * @returns {Array<String>} relative file paths inside of the `directory_path`
 */
module.exports = (directory_path) => {
    const found_files = [];

    function recursiveReadDirectory(recursive_directory_path) {
        console.log('test 1', { recursive_directory_path });

        if (fs.existsSync(recursive_directory_path)) {
            console.log('test 2 A');
            if (fs.statSync(recursive_directory_path).isDirectory()) {
                console.log('test 3 A');
                for (const filtered_directory_item of fs.readdirSync(recursive_directory_path).filter(item => item[0] !== '.')) {
                    console.log('test 4', { filtered_directory_item });
                    recursiveReadDirectory(path.join(recursive_directory_path, filtered_directory_item));
                }
            } else {
                console.log('test 3 B', { recursive_directory_path });
                found_files.push(recursive_directory_path);
            }
        }

        console.log('test 2 B');
        return found_files;
    }

    return recursiveReadDirectory(directory_path);
};

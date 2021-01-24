'use strict';

const recursiveReadDirectory = require('../index');

const current_working_directory_path = process.cwd();
const current_working_directory_files = recursiveReadDirectory(process.cwd());

console.log({
    current_working_directory_path,
    current_working_directory_files,
});

//------------------------------------------------------------//
//                   Copyright (c) MidSpike                   //
//------------------------------------------------------------//

import path from 'node:path';

import recursiveReadDirectory = require('../index');

//------------------------------------------------------------//

const expected_file_paths = [
    'nested/test',
    'nested/test.file',
    'test',
    'test.file',
];

//------------------------------------------------------------//

const test_directory_path = path.join(process.cwd(), 'tests');
console.log('[Info] test_directory_path:', test_directory_path);

const test_directory_files = recursiveReadDirectory(test_directory_path);
console.log('[Info] test_directory_files:', test_directory_files);

//------------------------------------------------------------//

for (const expected_file_path of expected_file_paths) {
    const file_exists = test_directory_files.includes(expected_file_path);

    if (!file_exists) {
        throw new Error(`[Failure] expected file path not found: ${expected_file_path}`);
    }

    console.log('[Info] expected file path found:', expected_file_path);
}

console.log('[Success] all expected file paths found');

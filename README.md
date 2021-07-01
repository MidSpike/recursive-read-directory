# Recursive Read Directory

## Installation
```
npm i github:MidSpike/recursive-read-directory
```

## Usage

Take a look at the example directory.
```
process.cwd()
│   .env
│   index.js
│   README.md
│
├───tests
│        test.js
│
└───node_modules
         etc...
```

Using the following code snippet:
```js
const recursiveReadDirectory = require('recursive-read-directory');
const item_filter = (directory_item) => !['node_modules', '.env'].includes(directory_item);
console.log(recursiveReadDirectory(process.cwd(), item_filter));
```
will result in this output:
```js
[
    'index.js',
    'README.md',
    'tests\\test.js'
]
```

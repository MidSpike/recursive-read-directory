# Recursive Read Directory

## Installation
```
npm i github:MidSpike/recursive-read-directory
```

## Usage

Take a look at the example directory.
```
process.cwd()
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│
├───.vscode
│        settings.json
│
├───dist
│        index.d.ts
│        index.js
│        index.js.map
│
├───node_modules
│        ...
│
├───src
│        index.ts
│
└───tests
         test.js
```

The following code snippet:
```ts
import recursiveReadDirectory from 'recursive-read-directory';

console.log(
    recursiveReadDirectory('./dist')
);
```
will output:
```ts
[
    'index.d.ts',
    'index.js',
    'index.js.map',
]
```

## Information

Relative paths are returned using unix-style path separators `/` instead of windows-style `\`.

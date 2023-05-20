const path = require('path')
/** @type {import('jest').Config} */
const config = {
    verbose: true,
    preset: 'ts-jest',
    resolver: 'ts-jest-resolver',
    testPathIgnorePatterns: ['/node_modules/', 'dist', 'types'],
    moduleNameMapper: {
        'chalk': require.resolve('chalk'),
        '#ansi-styles': path.join(
            require.resolve('chalk').split('chalk')[0],
            'chalk/source/vendor/ansi-styles/index.js'
        ),
        '#supports-color': path.join(
            require.resolve('chalk').split('chalk')[0],
            'chalk/source/vendor/supports-color/index.js'
        ),
    },
}

module.exports = config

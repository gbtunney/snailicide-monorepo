import typescript2 from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-polyfill-node'

// rollup.config.mjs
//import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: './dist/index.cjs',
            format: 'cjs',
            name: 'GLibrary',
            plugins: [nodeResolve({ preferBuiltins: true }), commonjs()],
        },
        {
            file: './dist/index.min.cjs',
            format: 'cjs',
            name: 'GLibrary',
            plugins: [
                nodeResolve({ preferBuiltins: true }),
                commonjs(),
                terser(),
            ],
        },
        {
            file: './dist/iife.index.js',
            format: 'iife',
            name: 'GLibrary',
            globals: {
                ramda: 'R',
            },
            plugins: [nodePolyfills()],
        },
        {
            file: './dist/index.esm.js',
            format: 'esm',
            plugins: [
                nodePolyfills(),
                nodeResolve({ preferBuiltins: true }),
                commonjs(),
            ],
            exports: 'named',
        },
        {
            file: './dist/index.js',
            format: 'esm',
            sourcemap: true,
            plugins: [
                nodePolyfills(),
                nodeResolve({ preferBuiltins: true }),
                commonjs(),
            ],
        },
        {
            file: './dist/index.min.js',
            format: 'esm',
            plugins: [
                nodePolyfills(),
                nodeResolve({ preferBuiltins: true }),
                commonjs(),
                terser(),
            ],
        },
        {
            file: './dist/index.mjs',
            format: 'esm',
            plugins: [
                nodePolyfills(),
                nodeResolve({ preferBuiltins: true }),
                commonjs(),
            ],
        },
    ],
    plugins: [
        typescript2({
            useTsconfigDeclarationDir: true,
            tsconfig: './tsconfig.json',
        }),
        json(),
    ],
}

import { execa } from 'execa'
import { describe, expect, test } from 'vitest'
import pkg from './package.json'
import { parsePackageJson } from './types/index.js'

describe('CLI-app example', () => {
    test('should match example version and not error', async () => {
        const { exitCode, stdout } = await execa('node', [
            './dist/example.js',
            '--interactive',
            'false',
            '-v',
        ])
        expect(stdout).toMatch(/0\.0\.0/)
        expect(exitCode).toBe(0)
    })

    test('error if no arguments', async () => {
        const { exitCode } = await execa(
            'node',
            ['./dist/example.js', '--interactive', 'false'],
            { reject: false },
        )
        expect(exitCode).toBe(1)
    })

    test('good if required  argument present', async () => {
        const { exitCode } = await execa('node', [
            './dist/example.js',
            '--outDir',
            './dist',
            '--interactive',
            'false',
        ])
        expect(exitCode).toBe(0)
    })

    test('error  if invalid root directory', async () => {
        const { exitCode } = await execa(
            'node',
            [
                './dist/example.js',
                '-o',
                './dist',
                '-r',
                './missingD',
                '--interactive',
                'false',
            ],
            { reject: false },
        )
        expect(exitCode).toBe(1)
    })
})

describe('CLI-app package helper', () => {
    test('parse package', () => {
        expect(parsePackageJson(pkg)).toBeDefined()
    })

    test.skip('semver error', () => {
        expect(
            parsePackageJson({ ...pkg, version: '1.2.2.2.2' }),
        ).toBeUndefined()
    })
})

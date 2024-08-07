import shell from 'shelljs'
import { describe, expect, test } from 'vitest'
import pkg from './package.json'
import { parsePackageJson } from './types/index.js'
describe('CLI-app example', () => {
    test('should match example version and not error', () => {
        const result = shell.exec(
            'node ./dist/example.js --interactive false -v',
            { silent: true },
        )
        expect(result.stdout).toMatch(/0\.0\.0/)
        expect(result.code).toBe(0)
    })

    test('error if no arguments', () => {
        const result = shell.exec(
            'node ./dist/example.js --interactive false',
            { silent: true },
        )
        expect(result.code).toBe(1)
    })

    test('good if required  argument present', () => {
        const result = shell.exec(
            'node ./dist/example.js  --outDir "./dist" --interactive false  ',
            { silent: true },
        )
        expect(result.code).toBe(0)
    })

    test('error  if invalid root directory', () => {
        const result = shell.exec(
            'node ./dist/example.js  -o "./dist" -r "./missingD" --interactive false',
            { silent: true },
        )
        expect(result.code).toBe(1)
    })
})

describe('CLI-app package helper', () => {
    test('parse package', () => {
        expect(parsePackageJson(pkg)).toBeDefined()
    })
    test('semver error', () => {
        expect(
            parsePackageJson({ ...pkg, version: '1.2.2.2.2' }),
        ).toBeUndefined()
    })
})

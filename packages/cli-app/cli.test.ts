import shell from 'shelljs'
import { describe, expect, test } from 'vitest'

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

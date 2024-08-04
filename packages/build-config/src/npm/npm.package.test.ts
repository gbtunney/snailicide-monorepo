import { omit } from 'ramda'
import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { isNPMPackage } from './npm.package.js'

const example_package = {
    author: {
        email: 'gbtunney@mac.com',
        name: 'Gillian Tunney',
    },
    description: 'Description',
    license: 'MIT',
    main: 'index.js',
    name: 'g-libttest',
    repository: {
        type: 'git',
        url: 'git+https://github.com/gbtunney/snailicide-monorepo.git',
    },
    scripts: {},
    types: 'types/index.d.ts',
    version: '1.0.2',
}

const example_package2 = {
    ...example_package,
    name: 'g-libttest',
    scripts: {
        build: '33333',
        clean: 'jkjk',
        preinstall: 'jkjkjjk',
    },
}

const example_package_bad_name = {
    ...example_package,
    name: '--Glibttest',
}
const example_package_bad_semver = {
    ...example_package,
    version: '1',
}
const example_package_bad_email = {
    ...example_package,
    author: {
        email: 'gbtunney',
    },
}
const example_package_bad_desc = omit(['description'], example_package)

describe('isNPMPackage', () => {
    test('is valid package.json :', () => {
        const customSchema = z.object({
            name: z.literal('g-libttest'),
            scripts: z.object({
                build: z.string(),
                preinstall: z.string(),
            }),
        })
        const customSchemaStrict = z.object({
            name: z.literal('g-libttest'),
            scripts: z
                .object({
                    build: z.string(),
                    preinstall: z.string(),
                })
                .strict(),
        })
        expect(isNPMPackage(example_package2, customSchema)).toBe(true)
        expect(isNPMPackage(example_package2, customSchemaStrict)).toBe(false)

        const testSchemaScripts = z.object({
            scripts: z.object({
                build: z.string(),
                dev: z.string(),
                test: z.string(),
            }),
        })
        expect(isNPMPackage(example_package, testSchemaScripts)).toEqual(false)

        expect(
            isNPMPackage(
                { ...example_package2, version: '1.0002.2' },
                customSchema,
            ),
        ).toBe(false)

        expect(isNPMPackage(example_package_bad_name)).toEqual(false)
        expect(isNPMPackage(example_package_bad_email)).toEqual(false)

        expect(isNPMPackage(example_package_bad_desc)).toEqual(false)
        expect(isNPMPackage(example_package_bad_semver)).toEqual(false)
    })
})

import { describe, expect, test } from 'vitest'

import { getBanner } from './index.js'

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

/** Omit(["repository","description"],example_package) */
const example_package_bad = {
    author: {
        email: 'gbtunney@mac.com',
        name: 'Gillian Tunney',
    },
    description: 'Description',
    name: 'g-libttest',
    types: 'types/index.d.ts',
    version: '1.0.2',
}

describe('Rolluup Config Test', () => {
    test('BANNER', () => {
        // @ts-expect-error: package error
        expect(getBanner('hhhhhGTESTLIB', example_package_bad, false)).toBe(
            undefined,
        )

        const result = `/*
 * g-libttest v1.0.2
 * Module: hhhhhGTESTLIB
 * (c) 2024 - Gillian Tunney
 * Description: Description,
 * Github: git+https://github.com/gbtunney/snailicide-monorepo.git`
        expect(getBanner('hhhhhGTESTLIB', example_package, false)).toContain(
            result,
        )
    })
})

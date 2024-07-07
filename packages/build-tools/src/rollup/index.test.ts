import { describe, expect, test } from 'vitest'

import { get_banner } from './index.js'

const example_package = {
    name: 'g-libttest',
    version: '1.0.2',
    description: 'Description',
    types: 'types/index.d.ts',
    main: 'index.js',
    scripts: {},
    repository: {
        type: 'git',
        url: 'git+https://github.com/gbtunney/snailicide-monorepo.git',
    },
    license: 'MIT',
    author: {
        name: 'Gillian Tunney',
        email: 'gbtunney@mac.com',
    },
}
const example_package_bad = {
    name: 'g-libttest',
    version: '1.0.2',
    description: 'Description',
    types: 'types/index.d.ts',
    author: {
        name: 'Gillian Tunney',
        email: 'gbtunney@mac.com',
    },
} //omit(["repository","description"],example_package)

describe('Rolluup Config Test', () => {
    test('BANNER', () => {
        // @ts-expect-error: package error
        expect(get_banner('hhhhhGTESTLIB', example_package_bad, false)).toBe(
            undefined,
        )

        const result = `/*
 * g-libttest v1.0.2
 * Module: hhhhhGTESTLIB
 * (c) 2024 - Gillian Tunney
 * Description: Description,
 * Github: git+https://github.com/gbtunney/snailicide-monorepo.git`
        expect(get_banner('hhhhhGTESTLIB', example_package, false)).toContain(
            result,
        )
    })
})

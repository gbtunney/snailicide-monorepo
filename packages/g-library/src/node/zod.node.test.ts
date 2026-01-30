import { describe, expect, test } from 'vitest'

import * as zod from './zod.node.js'

describe('zod custom schemas', () => {
    test('TODO: reenable', () => {
        expect(true).toBe(true)
        //todo: reenable
        expect(
            zod
                .fsPathTypeExists('any', './')
                .safeParse('sample_image/testimage.jpeg').success,
        ).toBe(true)
        expect(
            zod
                .fsPathTypeExists('none', './')
                .safeParse('sample_image/testimage.jpeg').success,
        ).toBe(false)
        expect(
            zod.fsPathTypeExists('none', './').safeParse('sample_image/*.png')
                .success,
        ).toBe(true)
        expect(
            zod.fsPathTypeExists().safeParse('./sample_image/testimage.jpeg')
                .success,
        ).toBe(true)

        //test path resolution TODO: reenable someday
        const _resolvedSchema = zod
            .fsPathTypeExists()
            .safeParse('./sample_image/..//sample_image/testimage.jpeg')
        //expect(_resolvedSchema.data).toEqual('/Users/gilliantunney/snailicide-monorepo/packages/g-library/sample_image/testimage.jpeg')
        //const _resolvedDir = zod.fsPathTypeExists('directory').safeParse('./sample_image/..//sample_image/')
        //expect(_resolvedSchema.data).toEqual('/Users/gilliantunney/snailicide-monorepo/packages/g-library/sample_image/testimage.jpeg')

        expect(
            zod.fsPathTypeExists('any').safeParse('./sample_image/*').success,
        ).toBe(true)
        expect(
            zod.fsPathTypeExists('any').safeParse('./sample_imaddge/*').success,
        ).toBe(false)
        expect(
            zod
                .fsPathTypeExists(['glob', 'directory'])
                .safeParse('./sample_image/*').success,
        ).toBe(true)
        expect(
            zod
                .fsPathExists(true, './')
                .safeParse('sample_image/testimage.jpeg').success,
        ).toBe(true)
        expect(
            zod
                .fsPathArrayHasFiles(false, './')
                .safeParse('sample_image/*.jpeg').success,
        ).toBe(true)
        expect(
            zod.fsPathArrayHasFiles(false, './').safeParse('sample_image')
                .success,
        ).toBe(false)
        expect(
            zod.fsPathArrayHasFiles(true, './').safeParse('sample_image')
                .success,
        ).toBe(true)
        expect(
            zod
                .fsPathExists(false, './')
                .safeParse('sample_image/testjjjimage.jpeg').success,
        ).toBe(true)

        expect(
            zod.fsPathExists(false, './').safeParse('sample_image22').success,
        ).toBe(true)
    })
})
export {}

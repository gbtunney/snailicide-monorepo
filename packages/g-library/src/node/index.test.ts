import { describe, expect, test } from 'vitest'

import { getImageBase64 } from './encodeBase64.js'
import {
    getExistingPathType,
    getFilePathArr,
    getFilePathObj,
    isFile,
    isFileArray,
} from './file.path.array.js'
describe('encodeBase64 getImageBase64', () => {
    test('returns an encoded string for a file path', () => {
        const imageTest = getImageBase64(
            './sample_image/testimage.jpeg',
            'jpeg',
        )
        expect(imageTest.length).toBeGreaterThan(20)
        const imageTest2 = getImageBase64(
            './sample_image/_badurltestimage.jpeg',
            'jpeg',
        )
        expect(imageTest2).toBe('undefined')
    })
})
describe('getFilePathArr getFilePathObj', () => {
    test('returns filepath object', () => {
        const filePathObj = getFilePathObj('./sample_image/testimage.jpeg')
        const filePathObj2 = getFilePathObj(
            './sample_image/_badurltestimage.jpeg',
        )
        const filePathGlob = './sample_image/*'
        if (filePathObj2 !== undefined) {
            expect(filePathObj2.excists).toEqual(false)
        } else expect(false).toEqual(true)

        if (filePathObj !== undefined) {
            expect(filePathObj.filename).toEqual('testimage')
            expect(filePathObj.extname).toEqual('jpeg')
            expect(filePathObj.parentdirname).toEqual('sample_image')
        } else expect(false).toEqual(true)
        //expect(getFilePathObj(filePathGlob)).toBeUndefined
        expect(getFilePathArr(filePathGlob).length).toBeGreaterThan(1)
        expect(getFilePathArr('./sample_image/testimage.jpeg').length).toBe(1)
        expect(getFilePathArr('./sample_image').length).toBe(1)
        expect(getFilePathArr('./sample_image', true).length).toBe(2)
    })

    test('returns allowed extension types', () => {
        expect(getExistingPathType('./sample_image/')).toBe('directory')
        expect(getExistingPathType('./sample_image/*.{jpeg,jpg}')).toBe('glob')

        expect(getExistingPathType('./sample_image/*.{png,jpg}')).toBe(
            undefined,
        )
        expect(getExistingPathType('./sample_image/kitten2.jpeg')).toBe('file')
        expect(getExistingPathType('./sample_image/kitten332.jpeg')).toBe(
            undefined,
        )

        expect(isFile('./sample_image//')).toBe(false)
        expect(isFile('./sample_image/fileme.png', 'jpeg')).toBe(false)
        expect(
            isFile('./sample_image/fileme.png', ['jpeg', 'png', 'svg']),
        ).toBe(true)

        expect(isFileArray('./sample_image/fileme.png')).toBe(false)
        expect(isFileArray('./sample_image/*.png')).toBe(false)
        expect(isFileArray('./sample_image/*.png', false)).toBe(true)

        expect(isFileArray('./sample_image/*.{jpeg,jpg}')).toBe(true)
        expect(isFileArray('./sample_image/*.{png,jpg}')).toBe(false)

        expect(isFileArray('./sample_image/', true)).toBe(false)
        expect(isFileArray('./sample_image/', true, true)).toBe(true)

        expect(isFileArray('./sample_ima3ge/*.{png,jpg}', false)).toBe(true)
        expect(isFileArray('./sample_ima3ge}', false)).toBe(false)

        expect(isFileArray('./emptydir', true, true)).toBe(false)
    })
})

export {}

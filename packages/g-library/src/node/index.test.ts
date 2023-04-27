import { getImageBase64 } from './encodeBase64.js'
import { getFilePathArr, getFilePathObj } from './file.path.array.js'
describe('encodeBase64 getImageBase64', () => {
    it('returns an encoded string for a file path', () => {
        const imageTest = getImageBase64(
            './sample_image/testimage.jpeg',
            'jpeg'
        )
        expect(imageTest.length).toBeGreaterThan(20)
        const imageTest2 = getImageBase64(
            './sample_image/_badurltestimage.jpeg',
            'jpeg'
        )
        expect(imageTest2).toBe('undefined')
    })
})
describe('getFilePathArr getFilePathObj', () => {
    it('returns filepath object', () => {
        const filePathObj = getFilePathObj('./sample_image/testimage.jpeg')
        const filePathObj2 = getFilePathObj(
            './sample_image/_badurltestimage.jpeg'
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
        expect(getFilePathObj(filePathGlob)).toBeUndefined
        expect(getFilePathArr(filePathGlob).length).toBeGreaterThan(1)
        expect(getFilePathArr('./sample_image/testimage.jpeg').length).toBe(1)
    })
})

export {}

import { chroma, isChromaColor, validate } from './index'

describe('chroma.ts | validate', () => {
    it('validate function', () => {
        expect(validate('palegrjeen')).toBe(false)
        expect(validate('palegreen')).toBe(true)

        if (isChromaColor('red')) {
            const color = chroma.color('red').hex()
            expect(chroma.color('red').hex()).toBe('#ff0000')
        }
    })
})
export {}

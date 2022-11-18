//parseIntegerType
import { parseIntegerType, toInteger } from './index.js'
describe('parseIntegerType,toInteger ', () => {
    it('returns `number` when parsed', () => {
        expect(parseIntegerType(33)).toBe(33)
        expect(parseIntegerType('33px')).toBe(33)
        expect(parseIntegerType('33.33')).toBe(33)
        expect(parseIntegerType('33.333px')).toBe(33)

        ///this is bustedd.
        expect(parseIntegerType(33.333, false)).toBe(33)
    })
})

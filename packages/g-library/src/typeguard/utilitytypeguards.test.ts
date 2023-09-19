import { EmptyArray } from './../types/empty.js'
import {
    isNonEmptyArray,
    isEmptyArray,
    isEmptyObject,
    isNonEmptyObject,
} from './utility.typeguards'
describe('typeguards', () => {
    it('returns `true` for values parseable number', () => {
        //TODO: PLEASE REWRITE OR RECOVER these tests
        const test: EmptyArray = []
        const test2 = ['gillian']
        const testObj = { hi: 'gillian' }
        expect(isNonEmptyArray<string>(test2)).toBe(true)
        expect(isEmptyArray(test2)).toBe(false)

        // @ts-expect-error should make a ts error
        expect(isNonEmptyArray(testObj)).toBe(false)

        expect(isNonEmptyObject(testObj)).toBe(true)

        //TODO :: FIX THIS
        // @ts-expect-error ts error
        expect(isEmptyObject(test)).toBe(true)

        //TODO :: FIX THIS ??!
        // @ts-expect-error tsexpect error
        expect(isNonEmptyObject(test2)).toBe(false)
    })
})
export {}

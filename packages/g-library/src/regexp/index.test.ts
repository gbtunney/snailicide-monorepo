import { getRegExpStartOfString, getRegExpEndOfString } from './index.js'
describe('unit | isNumberParseable', () => {
    it('returns `true` for values parseable number', () => {
        expect(getRegExpEndOfString(['svg', 'png']).test('myfile.jpg')).toBe(
            false
        )

        expect(getRegExpEndOfString(['svg', 'png']).test('myfile.png')).toBe(
            true
        )

        expect('myfile.svg'.replace(getRegExpEndOfString('svg'), 'png')).toBe(
            'myfile.png'
        )

        expect(
            getRegExpStartOfString(
                ['Gill', 'hill'],
                ['global', 'ignoreCase']
            ).test('gillian')
        ).toBe(true)
    })
})
export {}

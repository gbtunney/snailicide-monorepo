import { expect, test } from 'vitest'

import { formatString } from './format-str.js'

test('returns `true` for values parseable number', () => {
    expect(
        formatString('this is an %s demonstration %s', ['formatting', 'gbt']),
    ).toBe('this is an formatting demonstration gbt')
})

export {}

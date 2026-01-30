// typed-regexp.test.ts
import { describe, expect, it } from 'vitest'

import {
    asAnnotatedPattern,
    cleanAnnotatedRegex,
    typedRegexp,
} from './typed.regexp.js' // adjust filename

// ------------------------------------------------------------------------------------
// 1. cleanRegex() behavior
// ------------------------------------------------------------------------------------

describe('cleanRegex', () => {
    it('removes comments and whitespace', () => {
        const annotated = `
      ^ (?<prefix> foo )     # prefix
      (?<suffix> bar )       # suffix
    `
        const result = cleanAnnotatedRegex(annotated)
        expect(result).toBe('^(?<prefix>foo)(?<suffix>bar)')
    })
})

// ------------------------------------------------------------------------------------
// 2. typedRegexp() – runtime matching behavior
// ------------------------------------------------------------------------------------

describe('typedRegexp – runtime', () => {
    const expression = typedRegexp<'^(?<first>foo)-(?<second>bar)$'>(
        '^(?<first>foo)-(?<second>bar)$',
    )

    it('matches and returns typed groups', () => {
        const matchResult = expression.execTyped('foo-bar')

        expect(matchResult).not.toBeNull()

        if (matchResult === null) return

        expect(matchResult[0]).toBe('foo-bar')
        expect(matchResult.index).toBe(0)
        expect(matchResult.input).toBe('foo-bar')
        expect(matchResult.groups.first).toBe('foo')
        expect(matchResult.groups.second).toBe('bar')
    })

    it('returns null when no match occurs', () => {
        const matchResult = expression.execTyped('nope')
        expect(matchResult).toBeNull()
    })
})

// ------------------------------------------------------------------------------------
// 3. Type-level tests using satisfies + ts-expect-error patterns
// ------------------------------------------------------------------------------------

describe('typedRegexp – type inference', () => {
    it('infers group names as object keys', () => {
        const regex = typedRegexp<'^(?<alpha>a+)(?<beta>b+)$'>(
            '^(?<alpha>a+)(?<beta>b+)$',
        )

        const result = regex.execTyped('aaabbb')
        if (result === null) throw new Error('unexpected null')

        // should be string
        const alphaGroup: string = result.groups.alpha
        const betaGroup: string = result.groups.beta

        expect(alphaGroup).toBe('aaa')
        expect(betaGroup).toBe('bbb')
    })

    it('does not permit unknown groups (type-level)', () => {
        const regex = typedRegexp<'^(?<only>value)$'>('^(?<only>value)$')

        const matchResult = regex.execTyped('value')
        if (matchResult === null) throw new Error('unexpected')

        // @ts-expect-error – unknown group name

        const wrong: string = matchResult.groups.notAGroup
        expect(true).toBe(true)
    })

    it('infers EmptyObject when no capturing groups exist', () => {
        const regex = typedRegexp<'^foo$'>('^foo$')

        const matchResult = regex.execTyped('foo')
        if (matchResult === null) throw new Error('unexpected')

        // should have no keys at all
        expect(Object.keys(matchResult.groups)).toHaveLength(0)

        // @ts-expect-error - there are no group keys
        const testing = matchResult.groups.anything
        expect(true).toBe(true)
    })
})

// ------------------------------------------------------------------------------------
// 4. Integration test: whitespace + comments + groups
// ------------------------------------------------------------------------------------

describe('typedRegexp – integration', () => {
    it('handles annotated multi-line regex', () => {
        const annotatedPattern = `
  ^ (?<lhs> [a-z]+ )   # left side
  =
  (?<rhs> [0-9]+ )     # right side
  $
`

        const flatPattern = asAnnotatedPattern(
            annotatedPattern,
            '^(?<lhs>[a-z]+)=(?<rhs>[0-9]+)$',
        )

        const regex = typedRegexp(flatPattern)

        const matchResult = regex.execTyped('abc=123')

        if (matchResult === null) throw new Error('unexpected null')

        expect(matchResult.groups.lhs).toBe('abc')
        expect(matchResult.groups.rhs).toBe('123')
    })
})

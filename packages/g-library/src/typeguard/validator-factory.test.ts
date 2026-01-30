import { describe, expect, test } from 'vitest'
import { factoryValidator } from './validator-factory.js'

describe('factoryValidator core', () => {
    const finitePredicate = (value: unknown): value is number =>
        typeof value === 'number' && Number.isFinite(value)

    const { isFiniteNumber, isNotFiniteNumber } = factoryValidator(
        finitePredicate,
        'finiteNumber',
    )

    test('finiteNumber guards', () => {
        expect(isFiniteNumber(10)).toBe(true)
        expect(isFiniteNumber(Infinity)).toBe(false)
        expect(isNotFiniteNumber(Infinity)).toBe(true)
    })

    const alphaPredicate = (value: unknown): boolean =>
        typeof value === 'string' && /^[a-z]+$/i.test(value)

    const { isAlpha, isNotAlpha } = factoryValidator(alphaPredicate, 'alpha')

    test('alpha boolean predicates', () => {
        expect(isAlpha('abc')).toBe(true)
        expect(isAlpha('123')).toBe(false)
        expect(isNotAlpha('123')).toBe(true)
    })
})

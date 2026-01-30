import { describe, expect, it } from 'vitest'
import {
    entriesOf,
    fromEntries,
    fromEntriesRecord,
    keysOf,
    mapKeys,
    mapObject,
    mapValues,
} from './entries.js'

// --------------------------------------------
// keysOf
// --------------------------------------------
describe('keysOf', () => {
    it('returns typed keys', () => {
        const obj = { a: 1, b: 2 } as const
        const result = keysOf(obj)
        expect(result).toEqual(['a', 'b'])
    })
})

// --------------------------------------------
// entriesOf
// --------------------------------------------
describe('entriesOf', () => {
    it('returns typed Object.entries', () => {
        const obj = { a: 1, b: 2 } as const
        const result = entriesOf(obj)
        expect(result).toEqual([
            ['a', 1],
            ['b', 2],
        ])
    })
})

// --------------------------------------------
// fromEntries
// --------------------------------------------
describe('fromEntries', () => {
    it('reconstructs an object with correct types', () => {
        const tuple = [
            ['a', 1],
            ['b', 2],
        ] as const

        const result = fromEntries(tuple)
        expect(result).toEqual({ a: 1, b: 2 })
    })
})

// --------------------------------------------
// fromEntriesRecord
// --------------------------------------------
describe('fromEntriesRecord', () => {
    it('creates a Record<Key, Value>', () => {
        const tuples: ReadonlyArray<readonly ['x', number]> = [['x', 42]]
        const result = fromEntriesRecord(tuples)
        expect(result).toEqual({ x: 42 })
    })
})

// --------------------------------------------
// mapKeys
// --------------------------------------------
describe('mapKeys', () => {
    it('maps keys but preserves values', () => {
        const input = { a: 1, b: 2 } as const
        const result = mapKeys(input, (key) => `mapped_${key}`)

        expect(result).toEqual({
            mapped_a: 1,
            mapped_b: 2,
        })
    })
})

// --------------------------------------------
// mapObject
// --------------------------------------------
describe('mapObject', () => {
    it('maps entries to new key/value types', () => {
        const input = { a: 1, b: 2 } as const

        const result = mapObject(input, ([key, value], index) => {
            return [
                `K${index.toString()}_${key.toUpperCase()}`,
                value * 10,
            ] as const
        })

        expect(result).toEqual({
            K0_A: 10,
            K1_B: 20,
        })
    })

    it('allows filtering entries by returning null', () => {
        const input = { a: 1, b: 2, c: 3 } as const

        const result = mapObject(input, ([key, value]) => {
            if (value % 2 === 0) return null
            return [key, value * 10] as const
        })

        expect(result).toEqual({
            a: 10,
            c: 30,
        })
    })
})

// --------------------------------------------
// mapValues
// --------------------------------------------
describe('mapValues', () => {
    it('maps values while keeping keys', () => {
        const input = { a: 1, b: 2, c: 3 } as const

        const result = mapValues(input, (value) => value * 100)

        expect(result).toEqual({
            a: 100,
            b: 200,
            c: 300,
        })
    })
})

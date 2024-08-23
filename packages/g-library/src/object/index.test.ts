import { expect, test } from 'vitest'
import { flatten, tg, unflatten } from './index.js'

test('Vitest Example', () => {
    expect(true).toBe(true)
})
test('flatten', () => {
    const obj = { a: { b: { c: 1 } } }
    const flattened = flatten(obj)
    expect(flattened).toEqual({ 'a.b.c': 1 })
})

test('unflatten', () => {
    const flattened = { 'a.b.c': 1 }
    const unflattened = unflatten(flattened)
    expect(unflattened).toEqual({ a: { b: { c: 1 } } })
})

test('isJsonifiable', () => {
    const obj = { age: 30, name: 'John' }
    const isJsonifiable = tg.isJsonifiable(obj)
    expect(isJsonifiable).toBe(true)
})

test('isJsonifiableArray', () => {
    const arr = [1, 2, 3]
    const isJsonifiableArray = tg.isJsonifiableArray(arr)
    expect(isJsonifiableArray).toBe(true)
})

test('isJsonifiableObject', () => {
    const obj = { age: 30, name: 'John' }
    const isJsonifiableObject = tg.isJsonifiableObject(obj)
    expect(isJsonifiableObject).toBe(true)
})

test('isJsonifiableObjectLike', () => {
    const obj = { age: 30, name: 'John' }
    const isJsonifiableObjectLike = tg.isJsonifiableObjectLike(obj)
    expect(isJsonifiableObjectLike).toBe(true)
})

test('isJsonValue', () => {
    const value = 'John'
    const isJsonValue = tg.isJsonValue(value)
    expect(isJsonValue).not.toBe(false)
})

export {}
export {}

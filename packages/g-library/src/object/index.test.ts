import { expect, test } from 'vitest'
import { z } from 'zod'
import {
    flatten,
    jsonParser,
    tg,
    unflatten,
} from './index.js'
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
    const _schema = z.array(z.number())
    const _parser = jsonParser(_schema)
    expect(jsonParser<typeof _schema>(_schema).validate(arr)).toBe(true)

    expect(
        jsonParser<typeof _schema>(_schema).validate("['1', '2', '3']"),
    ).toBe(false)

    //needs to be number, string w single quotes is invalid JSON
    expect(jsonParser().validate('[1, 2, 3]')).toBe(true)
    const _resultVal = jsonParser<typeof _schema>(_schema).serialize([1, 2, 3])

    expect(jsonParser().deserialize(_resultVal)).toBeDefined()
    expect(
        jsonParser<typeof _schema>(_schema).deserialize(_resultVal),
    ).toBeDefined()

    //idk look more into these?
    expect(
        jsonParser(z.array(z.coerce.number())).validate(['1', '2', '3']),
    ).toBe(true)
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

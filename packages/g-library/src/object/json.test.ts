import { describe, expect, expectTypeOf, test } from 'vitest'
import {
    demoDeserializeJSON,
    demosafeSerializeJson,
    prettyPrintJSON,
    safeDeserializeJson,
    testprettyPrintJSON,
} from './json.js'

describe('JSON serialize', () => {
    test('prettyPrintJSON should return a pretty-printed JSON string', () => {
        const obj = { age: 30, name: 'John' }
        const result = prettyPrintJSON(obj)
        expect(result).toBeTypeOf('string')
    })
    test('safeDeserializeJson should return a deserialized JSON object', () => {
        const json = `{"name":"John","age":30}`
        const expected = { age: 30, name: 'John' }
        const result = safeDeserializeJson(json)
        expect(result).toEqual(expected)
    })

    test("demoDeserializeJSON  and serialize  should return the deserialized JSON object with the tag or 'ERROR'", () => {
        type TestJson = { name: string; age: number }
        const testjson: TestJson = { age: 30, name: 'John' }

        const serialized_result = demosafeSerializeJson<TestJson>(testjson)
        expect(serialized_result).toBeTypeOf('string')

        if (serialized_result !== 'ERROR') {
            const ppExample = testprettyPrintJSON(serialized_result)
            const result = demoDeserializeJSON(serialized_result)
            expectTypeOf(result).not.toMatchTypeOf<{
                name: number
                age: number
            }>()
            expectTypeOf(result).toMatchTypeOf<TestJson>()
        }
    })

    test("demosafeSerializeJson should return a serialized JSON string with the tag or 'ERROR'", () => {
        const obj = { age: 30, name: 'John' }
        const expected = `{"name":"John","age":30}`
        const result = demosafeSerializeJson(obj)
        expect(result).toMatch(new RegExp(/age/, 'gm'))

        const invalidObj = { age: 'thirty', name: 'John' }
        const errorResult = demosafeSerializeJson(invalidObj)
        expect(errorResult).toEqual(JSON.stringify(invalidObj))
        expectTypeOf(errorResult).not.toMatchTypeOf<typeof obj>(obj)

        if (errorResult !== 'ERROR') {
            const errorResultLat4est = demoDeserializeJSON(errorResult)
        }
    })
})

import { describe, expect, expectTypeOf, test } from 'vitest'
import { z } from 'zod'
import {
    jsonParser,
    makeJsonStringifiedSchema,
} from './json-stringified.js'
import { prettyPrintJSON, safeDeserializeJson } from './json.js'
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

        const _schemaresult = jsonParser()
        const serialized_result = _schemaresult.serialize(testjson)
        expect(serialized_result).toBeTypeOf('string')

        if (serialized_result !== 'ERROR') {
            const ppExample = serialized_result
            const result = _schemaresult.deserialize(serialized_result)
            expectTypeOf(result).not.toMatchObjectType<{
                name: string
                age: string
            }>()
            /* expectTypeOf(result).toMatchObjectType<{
                name: string
                age: number
            }>()*/
        }
    })

    test("SerializeJson should return a serialized JSON string with the tag or 'ERROR'", () => {
        const obj = { age: 30, name: 'John' }
        const expected = `{"name":"John","age":30}`
        const _schemaa = z.object({
            age: z.number(),
            name: z.string(),
        })
        const result =
            makeJsonStringifiedSchema<typeof _schemaa>(_schemaa).serialize(obj)
        expect(result).toMatch(new RegExp(/age/, 'gm'))
        const result2 = jsonParser().serialize(obj)

        const invalidObj = { age: 'thirty', name: 'John' }
        const errorResult = jsonParser().serialize(invalidObj)
        expect(errorResult).toEqual(JSON.stringify(invalidObj))
        expectTypeOf(obj).not.toMatchObjectType()
        const _errorResult = jsonParser().deserialize(errorResult)
        console.log('_errorResult', _errorResult)
        if (errorResult !== 'ERROR') {
            //  const errorResultLat4est = demoDeserializeJSON(errorResult)
        }
    })
})

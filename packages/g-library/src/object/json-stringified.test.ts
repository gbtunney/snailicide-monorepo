import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import {
    type InferJsonSchemaInput,
    type InferStringifiedOutput,
    jsonLooseCodec,
    jsonStringified,
} from './json-stringified.js'

describe('jsonStringified<T>()', () => {
    const UserSchema = z.object({
        age: z.number().int().nonnegative(),
        id: z.string(),
    })

    const JsonUser = jsonStringified(UserSchema)

    it('brands correct JSON strings', () => {
        const raw = '{"id":"abc","age":22}'
        const branded = JsonUser.parse(raw)

        expect(branded).toBeTypeOf('string')
        expect(branded).toEqual(raw)
    })

    it('rejects invalid JSON', () => {
        expect(() => JsonUser.parse('{bad')).toThrow()
    })

    it('rejects primitive string JSON like "hello"', () => {
        expect(() => JsonUser.parse('"hello"')).toThrow()
    })

    it('rejects values failing schema', () => {
        expect(() => JsonUser.parse('{"id":"123"}')).toThrow()
    })

    it('serializes T → branded string', () => {
        const branded = JsonUser.serialize({ age: 2, id: 'a' })
        expect(branded).toBeTypeOf('string')
        expect(branded).toEqual('{"id":"a","age":2}')
    })

    it('deserializes branded JSON → T', () => {
        const raw = JsonUser.serialize({ age: 1, id: 'x' })
        const value = JsonUser.deserialize(raw)

        expect(value).toEqual({ age: 1, id: 'x' })
    })

    it('parseToValue gives T directly', () => {
        const value = JsonUser.parseToValue('{"id":"foo","age":99}')
        expect(value).toEqual({ age: 99, id: 'foo' })
    })

    it('round-trips cleanly', () => {
        const original = { age: 22, id: 'z' }
        const raw = JsonUser.serialize(original)
        const parseToVal: InferStringifiedOutput<typeof JsonUser> =
            JsonUser.parseToValue(raw)
        const back = JsonUser.deserialize(raw)
        expect(back).toEqual(original)
        expect(back).toEqual(original)
    })

    // ---- Nested Arrays / QArray ----

    const QArraySchema = z.array(z.array(z.number()))
    const JsonQArray = jsonStringified(QArraySchema)

    it('validates nested arrays', () => {
        const raw = '[[1,2],[3,4]]'
        const branded = JsonQArray.parse(raw)
        expect(branded).toEqual(raw)
    })

    it('fails malformed nested arrays', () => {
        expect(() => JsonQArray.parse('[[1,2],["x"]]')).toThrow()
    })

    it('round-trips QArray', () => {
        const original = [
            [1, 2],
            [3, 4],
        ]
        const raw = JsonQArray.serialize(original)
        const val = JsonQArray.parseToValue(raw)
        expect(val).toEqual(original)
    })

    it('infers correct input/output types', () => {
        const JsonUser = jsonStringified(
            z.object({
                age: z.number().default(22),
                id: z.string(),
            }),
        )

        const _out: InferStringifiedOutput<typeof JsonUser> = {
            age: 3,
            id: 'sdsdssd',
        }
        const _in: InferJsonSchemaInput<typeof JsonUser> = { id: 'sdsdssd' }
        expect(JsonUser.outputValue(_out)).toBe(_out)
        expect(JsonUser.inputValue(_in)).toBe(_in)
        // @ts-expect-error age is missing
        const _out2: InferStringifiedOutput<typeof JsonUser> = { id: 'sdsdssd' }

        const testCodec = jsonLooseCodec(
            z.object({
                a: z.number(),
                b: z.string(),
                date: z.date().optional(),
            }),
        )
        const testCodec2 = jsonLooseCodec(z.string())

        const testyParse = z.array(z.string())
        const ttttt: z.input<typeof testCodec> = { a: 1, b: 'sdsd' }

        const ex2 = { a: 2, b: 'sdsd' }
        const ex2str = JSON.stringify(ex2)
        const _encoded = testCodec.decode(ex2str)
        const mystr: z.input<typeof testCodec> = { a: 'ss', b: 'sdsd' }
        //console.log("THE PARSABLE VALUE IS ", testCodec.encode(mystr)  )
    })
})

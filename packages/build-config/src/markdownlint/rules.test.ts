import { describe, expect, test } from 'vitest'
import { z } from 'zod'
import { getBaseConfig } from './base.config.js'
import {
    getRuleConfiguration,
    type MarkdownlintRuleConfiguration,
    processRuleConfiguration,
    validateRuleConfiguration,
} from './rules.js'

describe('markdownSchema', () => {
    ///todoz; getMarkdownlintRuleConfiguration should reflect strict or no
    test('validate markdownlint RULES', async () => {
        const CONFIG: MarkdownlintRuleConfiguration = {
            // 'default': true,
            MD001: false,
            // 'MD002':false,
            MD003: { style: 'atx' },
            MD005: false,
        }
        //  const mergedConfig= getRuleConfiguration(,{useDefault:false,useBaseConfig:true})
        expect(
            getRuleConfiguration(CONFIG, {
                useBaseConfig: false,
                useDefault: false,
            }),
        ).not.toHaveProperty('default')
        expect(
            await getRuleConfiguration(CONFIG, { useDefault: true }),
        ).toHaveProperty('default')

        expect(
            await getRuleConfiguration(CONFIG, { useBaseConfig: false }),
        ).not.toHaveProperty('MD014')
        expect(
            await getRuleConfiguration(CONFIG, {
                useBaseConfig: true,
                useDefault: true,
            }),
        ).toHaveProperty('MD014')
        expect(await getRuleConfiguration(CONFIG)).toHaveProperty('MD014')

        const _schema = z.object({
            MD013: z.object({
                code_block_line_length: z.number(),
            }),
        })

        let intResult: number = 0
        const _parse = _schema.safeParse(getBaseConfig())
        if (_parse.success) {
            intResult = _parse.data.MD013.code_block_line_length
        }
        expect(intResult).toEqual(120)

        const __config2 = await processRuleConfiguration(
            {
                // @ts-expect-error "wrong"
                'no-missing-space-closed-atx': {
                    lines_above: 1,
                    lines_below: 1,
                },
            },
            { throwOnError: false },
        )
        expect(__config2.valid).toBe(false)
    })
})

test('invalid rule key fails schema validation', async () => {
    const invalidConfig = {
        MD999: true,
    }
    // @ts-expect-error "wrong"
    const _result = await validateRuleConfiguration(invalidConfig, {
        throwOnError: false,
    })
    expect(_result.valid).toBe(false)
})

test('invalid rule configuration fails schema validation', async () => {
    const invalidConfig = {
        MD001: { level: 'critical' },
    }
    expect(
        // @ts-expect-error "wrong"
        (await processRuleConfiguration(invalidConfig, { throwOnError: false }))
            .valid,
    ).toBe(false)
})

test('omitting optional rules still passes schema validation', async () => {
    const partialConfig = {
        MD001: true,
    }
    expect((await validateRuleConfiguration(partialConfig)).valid).toBe(true)
})

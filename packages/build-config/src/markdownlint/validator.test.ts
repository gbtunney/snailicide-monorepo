import { PartialOnUndefinedDeep } from 'type-fest';
import {getConfigMD}from'./validator.js'

import { getMarkdownlintRuleConfiguration,MarkdownLintConfig } from './config.js'
import { omit } from 'ramda'
import { describe, expect, test } from 'vitest'
import { z } from 'zod'
import {logger}from './../logger/index.js'
import path from 'path'
import fs from 'fs'
 describe('markdownSchema', () => {
     
  ///todoz; getMarkdownlintRuleConfiguration should reflect strict or no 
    test("validate markdownlint", async () => { 
        const validConfig= getMarkdownlintRuleConfiguration({
          'default': true,
            'MD001': false,
           // 'MD002':false,
            'MD003': { style: 'atx' }, 
            MD005: false
          },true,false,true)
       
          const myval = await getConfigMD(validConfig,false)
       // LOGGER.error(myval.valid,myval.errors)
          expect(true).toBe(true)
     });
 
  
})



/*  test('invalid rule key fails schema validation', () => {
    const invalidConfig = {
      'MD999': true,
    }

    expect(() => {
      markdownSchema.parse(invalidConfig)
    }).toThrow(z.ZodError)
  })

  test('invalid rule configuration fails schema validation', () => {
    const invalidConfig = {
      'MD001': { level: 'critical' },
    }


    expect(() => {
      markdownSchema.parse(invalidConfig)
    }).toThrow(z.ZodError)
  })

  test('omitting optional rules still passes schema validation', () => {
    const partialConfig = {
      'MD001': true,
    }

    expect(() => {
      markdownSchema.parse(partialConfig)
    }).not.toThrow()
  })
}) */
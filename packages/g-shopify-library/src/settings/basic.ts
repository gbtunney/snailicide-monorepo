import { zod } from '@snailicide/g-library/node'
import { z } from 'zod'

import { select_option, text_base } from './composable.js'
/**
 * Basic_settings_schema_map Basic Settings Schema Definition Map
 * @type {Record<string, z.ZodSchema>}
 * @property {z.ZodSchema} text
 * @property {z.ZodSchema} textarea
 * @property {z.ZodSchema} number
 * @property {z.ZodSchema} checkbox
 * @property {z.ZodSchema} radio
 * @property {z.ZodSchema} select
 * @property {z.ZodSchema} rangd
 */
const basic_settings_schema_map = {
    checkbox: zod.object({
        default: zod.boolean().default(false),
        type: zod.literal('checkbox'),
    }),
    number: zod.object({
        default: zod.number().default(4444),
        placeholder: zod.string().optional(),
        type: zod.literal('number'), //zod.string().optional(),
    }),
    radio: zod.object({
        //format?
        /* * default - If unspecified, then the first option is selected using index=0 * */
        default: zod.union([zod.string(), zod.number().default(0)]),
        options: zod.array(select_option),
        type: zod.literal('radio'),
    }),
    range: zod.object({
        default: z.number(),
        //integer idk??
        max: z.number().default(1000), //required by shopify for range only
        min: z.number().default(0), //integer idk??
        step: z.number().step(1).default(1),
        type: z.literal('range'), //idk? or need constaints?
        /* * unit - example: "px" * */
        unit: z.union([
            z.enum(['px', '%', 'em', 'rem', 'vh']),
            z.string().default('px'),
        ]),
    }),
    select: zod.object({
        default: zod.union([zod.string(), zod.number().default(0)]),
        group: zod.string().optional(),
        options: zod.array(select_option),
        //todo: make this dynamic or factory??
        type: zod.literal('select'), //group?: string /// no other info providewd
    }),
    text: text_base.extend({
        type: zod.literal('text'),
    }),
    textarea: text_base.extend({
        type: zod.literal('textarea'),
    }),
}
enum BasicSettingsTypesEnum {
    Text = 'text',
    TextArea = 'textarea',
    Number = 'number',
    Checkbox = 'checkbox',
    Radio = 'radio',
    Range = 'range',
    Select = 'select',
}
//const basic_SettingsEnum = z.nativeEnum(BasicSettingsTypes)
//type BasicSettingsEnum = z.infer<typeof basic_SettingsEnum>

export const BasicSettings = basic_settings_schema_map
export type BasicSettingType = keyof typeof basic_settings_schema_map
export default BasicSettings

import { zod } from '@snailicide/g-library/node'
import { z } from 'zod'

import { select_option, text_base } from './composable.js'
/**
 * Basic_settings_schema_map Basic Settings Schema Definition Map
 *
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
    text: text_base.extend({
        type: zod.literal('text'),
    }),
    textarea: text_base.extend({
        type: zod.literal('textarea'),
    }),
    number: zod.object({
        type: zod.literal('number'),
        default: zod.number().default(4444),
        placeholder: zod.string().optional(), //zod.string().optional(),
    }),
    checkbox: zod.object({
        type: zod.literal('checkbox'),
        default: zod.boolean().default(false),
    }),
    radio: zod.object({
        type: zod.literal('radio'),
        options: zod.array(select_option), //format?
        /* * default - If unspecified, then the first option is selected using index=0 * */
        default: zod.union([zod.string(), zod.number().default(0)]),
    }),
    select: zod.object({
        //todo: make this dynamic or factory??
        type: zod.literal('select'),
        options: zod.array(select_option),
        default: zod.union([zod.string(), zod.number().default(0)]),
        group: zod.string().optional(), //group?: string /// no other info providewd
    }),
    range: zod.object({
        type: z.literal('range'),
        default: z.number(), //required by shopify for range only
        min: z.number().default(0), //integer idk??
        max: z.number().default(1000), //integer idk??
        step: z.number().step(1).default(1), //idk? or need constaints?
        /* * unit - example: "px" * */
        unit: z.union([
            z.enum(['px', '%', 'em', 'rem', 'vh']),
            z.string().default('px'),
        ]),
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

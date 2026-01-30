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
    checkbox: z.object({
        default: z.boolean().default(false),
        type: z.literal('checkbox'),
    }),
    number: z.object({
        default: z.number().default(4444),
        placeholder: z.string().optional(),
        type: z.literal('number'), //zod.string().optional(),
    }),
    radio: z.object({
        //format?
        /* * default - If unspecified, then the first option is selected using index=0 * */
        default: z.union([z.string(), z.number().default(0)]),
        options: z.array(select_option),
        type: z.literal('radio'),
    }),
    range: z.object({
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
    select: z.object({
        default: z.union([z.string(), z.number().default(0)]),
        group: z.string().optional(),
        options: z.array(select_option),
        //todo: make this dynamic or factory??
        type: z.literal('select'), //group?: string /// no other info providewd
    }),
    text: text_base.extend({
        type: z.literal('text'),
    }),
    textarea: text_base.extend({
        type: z.literal('textarea'),
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

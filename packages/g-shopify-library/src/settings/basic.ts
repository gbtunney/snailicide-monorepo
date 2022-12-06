import { z } from 'zod'
import { zod } from '@snailicide/g-library'
import { text_base, select_option } from './composable.js'
import { tg } from '@snailicide/g-library'
import { SettingTypes } from '../section_schema/setting.types'
import { Merge } from 'type-fest'
import { SidebarSettings } from './sidebar'
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
        default: zod.optionalDefault(zod.number(), 4444),
        placeholder: zod.string().optional(), //zod.string().optional(),
    }),
    checkbox: zod.object({
        type: zod.literal('checkbox'),
        default: zod.optionalDefault(zod.boolean(), false),
    }),
    radio: zod.object({
        type: zod.literal('radio'),
        options: zod.array(select_option), //format?
        /* * default - If unspecified, then the first option is selected using index=0 * */
        default: zod.union([
            zod.string(),
            zod.optionalDefault(zod.number(), 0),
        ]),
    }),
    select: zod.object({
        //todo: make this dynamic or factory??
        type: zod.literal('select'),
        options: zod.array(select_option),
        default: zod.union([
            zod.string(),
            zod.optionalDefault(zod.number(), 0),
        ]),
        group: zod.string().optional(), //group?: string /// no other info providewd
    }),
    range: zod.object({
        type: z.literal('range'),
        default: z.number(), //required by shopify for range only
        min: zod.optionalDefault(z.number(), 0),
        max: zod.optionalDefault(z.number(), 1000), //integer idk??
        step: zod.optionalDefault(z.number().step(1), 1), //idk? or need constaints?
        /* * unit - example: "px" * */
        unit: z.union([
            z.enum(['px', '%', 'em', 'rem', 'vh']),
            zod.optionalDefault(z.string(), 'px'),
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

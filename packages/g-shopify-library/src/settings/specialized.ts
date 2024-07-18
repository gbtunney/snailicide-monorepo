import { zod } from '@snailicide/g-library/node'

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
const specialized_settings_schema_map = {
    /* * Color Picker  *
     * * @return "color object" | "blank" */
    color: zod.object({
        type: zod.literal('color'),
        default: zod.string().optional(), //todo: hexcode to string default?: string //in hex code string format "#000000"
    }),
    /* * Gradient Picker
     * Color Background aka Gradient  *
     * @return string | "blank" */
    color_background: zod.object({
        //todo: also color_gradient?
        type: zod.literal('color_background'),
        default: zod.string().optional(), //todo: default?: string // example: "linear-gradient(#ffffff, #000000)"
    }),
    /* * Font Picker - From Shopify Font Library *
     * @see https://shopify.dev/themes/architecture/settings/fonts#shopify-font-library
     * cant add custom fonts. -- it says you can use typekit but i dont know if it can populate this selector. ???
     * @return font object
     * default is NOT allowed.
     *  */
    font_picker: zod.object({
        type: zod.literal('font_picker'),
        default: zod.string(), //todo: NOTE: THIS IS REQUIRED!!!  example "helvetica_n4"
    }),
    /* * HTML Type *
     * @values Not allowed: html | head | body
     * @return string |  EmptyDrop */
    html: zod.object({
        type: zod.literal('html'),
        default: zod.string().optional(), //todo:dont know if default , dont know if HTMLElement type will work
        placeholder: zod.string().optional(), //todo:dont know if placeholder , dont know if HTMLElement type will work
    }),
    /* * Rich Text  *
     * Supported Tags: p | br | strong | b | em | i | u | span
     * * * @return string | "EmptyDrop"  */
    richtext: zod.object({
        type: zod.literal('richtext'),
        default: zod.string().optional(), //todo:default must be wrapped in <p></p>/default must be wrapped in <p></p>
    }),
    /* * URL Picker  *
     * manually enter external URLs and relative paths and
     * Picker for Articles | Blogs | Collections | Pages | Products
     * @return string | nil
     * NOTE: ( IDK WHY ONLY COLLECTIONS? )
     * - Accepted values for the default attribute are /collections and /collections/all.  */
    url: zod.object({
        type: zod.literal('url'),
        default: zod.string().optional(), //todo: Accepted values for the default attribute are /collections and /collections/all.
    }),
    /* * VideoURL
     * Accept: Takes an array of accepted video providers. Valid values are youtube, vimeo, or both.*
     * @return string ( entered url ) | nil */
    video_url: zod.object({
        type: zod.literal('video_url'),
        default: zod.string().optional(),
        placeholder: zod.string().optional(),
        //todo: accept: ['youtube'] | ['vimeo'] | ['youtube', 'vimeo']
    }),
} as const

export const SpecializedSettings = specialized_settings_schema_map
export type SpecializedSettingType =
    keyof typeof specialized_settings_schema_map
export default SpecializedSettings

import { z } from 'zod'

/* * Composable ZodSchemas  * */

/**
 * Text_base Schema Definition (Composable Schemas)
 * @type {z.infer<typeof text_base>}
 * @property {z.ZodString} default
 * @property {z.ZodString} placeholder
 */
export const text_base = z.object({
    default: z.string().optional(),
    placeholder: z.string().optional(),
})

/**
 * Select_option Schema Definition (Composable Schemas)
 * @type {z.infer<typeof select_option>}
 * @property {z.ZodString} value
 * @property {z.ZodString} label
 */
export const select_option = z.object({
    //todo: maybe format according to case??
    label: z.string(),
    value: z.string(), //todo:maybe autopopulate using default?
})

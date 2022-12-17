import { z } from 'zod'
import { zod } from '@snailicide/g-library'
import { settingSchema } from '../settings/index.js'

export const ELEMENT_TAGS = [
    'div',
    'article',
    'aside',
    'footer',
    'header',
    'section',
] as const
const elementTags = z.enum(ELEMENT_TAGS)
export type ElementTags = z.infer<typeof elementTags>

export const PAGE_TYPES = [
    '404',
    'article',
    'blog',
    'cart',
    'collection',
    'list-collections',
    'customers/account',
    'customers/activate_account',
    'customers/addresses',
    'customers/login',
    'customers/order',
    'customers/register',
    'customers/reset_password',
    'gift_card',
    'index',
    'page',
    'password',
    'policy',
    'product',
    'search',
] as const

const pageTypes = z.enum(PAGE_TYPES)
export type PageTypes = z.infer<typeof pageTypes>

export const blockSchema = z.object({
    type: z.string(), //change to literal?
    name: z.string().optional(), ///dont know if optional
    limit: zod.number().int().optional(), //todo:might be wrong
    settings: settingSchema,
})
export type BlockSchema = z.infer<typeof blockSchema>
export const sectionSchema = z.object({
    name: z.string(),
    tag: elementTags.optional(),
    class: z.string().optional(), //todo: validate??
    limit: zod.optionalDefault(zod.number().int(), 3), //todo:might be wrong
    templates: z.array(pageTypes).optional(),

    settings: settingSchema.optional(),
    blocks: z.array(blockSchema).optional(),
})
export type SectionSchema = z.infer<typeof blockSchema>

export const validateSectionSchema = <
    Schema extends z.ZodSchema,
    Type = undefined
>(
    schema: Schema,
    value: Type extends undefined ? z.infer<typeof schema> : Type
): value is Type extends undefined ? z.infer<typeof schema> : Type =>
    schema.safeParse(value).success

export const parseSectionSchema = <
    Schema extends z.ZodSchema,
    Type = undefined
>(
    schema: Schema,
    value: Type extends undefined ? z.infer<typeof schema> : Type
): (Type extends undefined ? z.infer<typeof schema> : Type) | undefined =>
    schema.safeParse(value).success ? schema.parse(value) : undefined

export const debugSectionSchema = <
    Schema extends z.ZodSchema,
    Type = undefined
>(
    schema: Schema,
    value: Type extends undefined ? z.infer<typeof schema> : Type
): (Type extends undefined ? z.infer<typeof schema> : Type) | undefined =>
    schema.parse(value)

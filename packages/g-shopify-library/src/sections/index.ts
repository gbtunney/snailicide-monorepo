import { z } from 'zod'

import {
    getSettingGroupSchema,
    parseValidatorFactory,
} from '../settings/index.js'

const ELEMENT_TAGS = [
    'div',
    'article',
    'aside',
    'footer',
    'header',
    'section',
] as const
const elementTags = z.enum(ELEMENT_TAGS)
export type ElementTags = z.infer<typeof elementTags>

const PAGE_TYPES = [
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

const block_schema = z.object({
    ///dont know if optional
    limit: z.number().int().optional(), //change to literal?
    name: z.string().optional(), //todo:might be wrong
    settings: getSettingGroupSchema(),
    type: z.string(),
})
export type BlockSchema = z.infer<typeof block_schema>
const section_schema = z.object({
    blocks: z.array(block_schema).optional(),
    class: z.string().optional(),
    //todo: validate??
    limit: z.number().int().default(3),
    name: z.string(),
    settings: getSettingGroupSchema().optional(),

    tag: elementTags.optional(),
    //todo:might be wrong
    templates: z.array(pageTypes).optional(),
})
export type SectionSchema = z.infer<typeof section_schema>

const getSectionSettingsFactory =
    <T extends typeof section_schema | typeof block_schema>(schema: T) =>
    (data: unknown): z.infer<T> | undefined => {
        if (parseValidatorFactory(schema)(data)) {
            return schema.parse(data)
        }
        return undefined
    }

export const parseSectionSchema = getSectionSettingsFactory(section_schema)
export const parseBlockSchema = getSectionSettingsFactory(block_schema)

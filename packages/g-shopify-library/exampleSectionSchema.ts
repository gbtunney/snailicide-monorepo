import {
    LocalSchema,
    defineSettings,
    defineSectionSchema,
} from './src/index.js'
import type { PrefixProperties } from '@snailicide/g-library'

export type HeadingSettings = {
    content: LocalSchema.Setting<'text'>
    css: LocalSchema.Setting<'text'>
}

export const headingSettings: HeadingSettings = {
    content: {
        type: 'text',
        label: 'Heading:',
    },
    css: {
        type: 'text',
        label: 'Add custom css below',
        default: 'text-2xl text-center',
    },
}

export type CuratorGroupSettings = PrefixProperties<
    HeadingSettings,
    'heading_'
> & {
    publish_id: LocalSchema.Setting<'text'>
}

export const getSchema = () => {
    const heading_settings_group = defineSettings(
        headingSettings,
        'heading_'
    ) as PrefixProperties<HeadingSettings, 'heading_'>

    const curatorSettings: CuratorGroupSettings = {
        ...heading_settings_group,
        publish_id: {
            type: 'text',
            label: 'Curator Publish ID ( from embed code )',
            default: '8f06d909-ac15-451b-a5b8-0a275b7a44f5',
        },
    }
    const _settings = defineSettings(
        curatorSettings,
        'curator_'
    ) as PrefixProperties<CuratorGroupSettings, 'curator_'>
    const schema: LocalSchema.Schema<
        PrefixProperties<CuratorGroupSettings, 'curator_'>
    > = {
        name: 'Curator IO',
        tag: 'section',
        settings: _settings,
        presets: [
            {
                name: 'gbt-curator-io',
            },
        ],
    }
    return defineSectionSchema(schema, 'curator_')
}

export default getSchema()

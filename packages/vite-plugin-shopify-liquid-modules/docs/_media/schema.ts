import {
    parseSectionSchema,
    SectionSchema,
} from '@snailicide/g-shopify-library'

import curator_settings from './settings.js'

export const getSchema = () => {
    const _settings = curator_settings

    const schema: SectionSchema = {
        limit: 100,
        name: 'Curator IO',
        settings: _settings,
        tag: 'section',
        /* presets: [
            {
                name: 'gbt-curator-io',
            },
        ],*/
    }
    const result = parseSectionSchema(schema)

    return {
        ...schema,
        presets: [
            {
                name: 'gbt-curator-io',
            },
        ],
    }
}
export default getSchema()

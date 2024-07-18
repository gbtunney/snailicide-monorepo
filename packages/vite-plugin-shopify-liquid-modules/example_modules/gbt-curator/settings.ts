//import {headingSettings, HeadingSettings} from '../setting_groups/settings-heading'
import { Setting, SettingsMapped } from '@snailicide/g-shopify-library'

export type CuratorGroupSettings = {
    publish_id: Setting<'text'>
}

const getSettings = () => {
    // const heading_settings_group =
    // defineSettings(headingSettings, "heading_") as PrefixProperties<HeadingSettings, "heading_">
    const curatorSettings: SettingsMapped<CuratorGroupSettings> = [
        {
            id: 'publish_id',
            type: 'text',
            label: 'Curator Publish ID ( from embed code )',
            default: '8f06d909-ac15-451b-a5b8-0a275b7a44f5',
        },
    ]

    return curatorSettings //defineSettings(curatorSettings, "curator_")
}
export default getSettings()

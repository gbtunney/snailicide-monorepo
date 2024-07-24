import { describe, expect, test } from 'vitest'

import { parseThemeSettingSection } from './theme.js'
import type { Setting, SettingsMapped } from './index.js'

describe('zod', () => {
    test('zod', () => {
        type GlobalColorSettingsGroup = {
            //todo: look at why header type doesnt matter,
            /* * Colors * */
            color_header: Setting<'paragraph'>
            colors_solid_button_labels: Setting<'color'>

            /* * Accent Colors * */
            colors_accent_1: Setting<'color'>
            gradient_accent_1: Setting<'color_background'>
            colors_accent_2: Setting<'color'>
            gradient_accent_2: Setting<'color_background'>

            /* * Primary Colors * */
            color_header2: Setting<'header'>

            colors_text: Setting<'color'>
            colors_outline_button_labels: Setting<'color'>

            colors_background_1: Setting<'color'>
            gradient_background_1: Setting<'color_background'>

            colors_background_2: Setting<'color'>
            gradient_background_2: Setting<'color_background'>
        }

        const color_setting: SettingsMapped<GlobalColorSettingsGroup> = [
            {
                content: 't:settings_schema.colors.settings.header__1.content',
                type: 'header',
            },
            {
                default: '#FFFFFF',
                id: 'colors_solid_button_labels',
                info: 't:settings_schema.colors.settings.colors_solid_button_labels.info',
                label: 't:settings_schema.colors.settings.colors_solid_button_labels.label',
                type: 'color',
            },
            {
                default: '#121212',
                id: 'colors_accent_1',
                info: 't:settings_schema.colors.settings.colors_accent_1.info',
                label: 't:settings_schema.colors.settings.colors_accent_1.label',
                type: 'color',
            },
            {
                id: 'gradient_accent_1',
                label: 't:settings_schema.colors.settings.gradient_accent_1.label',
                type: 'color_background',
            },
            {
                default: '#334FB4',
                id: 'colors_accent_2',
                label: 't:settings_schema.colors.settings.colors_accent_2.label',
                type: 'color',
            },
            {
                id: 'gradient_accent_2',
                label: 't:settings_schema.colors.settings.gradient_accent_2.label',
                type: 'color_background',
            },
            {
                content: 't:settings_schema.colors.settings.header__2.content',
                type: 'header',
            },
            {
                default: '#121212',
                id: 'colors_text',
                info: 't:settings_schema.colors.settings.colors_text.info',
                label: 't:settings_schema.colors.settings.colors_text.label',
                type: 'color',
            },
            {
                default: '#121212',
                id: 'colors_outline_button_labels',
                info: 't:settings_schema.colors.settings.colors_outline_button_labels.info',
                label: 't:settings_schema.colors.settings.colors_outline_button_labels.label',
                type: 'color',
            },
            {
                default: '#FFFFFF',
                id: 'colors_background_1',
                label: 't:settings_schema.colors.settings.colors_background_1.label',
                type: 'color',
            },
            {
                id: 'gradient_background_1',
                label: 't:settings_schema.colors.settings.gradient_background_1.label',
                type: 'color_background',
            },
            {
                default: '#F3F3F3',
                id: 'colors_background_2',
                label: 't:settings_schema.colors.settings.colors_background_2.label',
                type: 'color',
            },
            {
                id: 'gradient_background_2',
                label: 't:settings_schema.colors.settings.gradient_background_2.label',
                type: 'color_background',
            },
        ]
        const colors_group = parseThemeSettingSection({
            name: 't:settings_schema.colors.name',
            settings: color_setting,
        })
        expect(colors_group).toEqual({
            name: 't:settings_schema.colors.name',
            settings: [
                {
                    content:
                        't:settings_schema.colors.settings.header__1.content',
                    type: 'header',
                },
                {
                    default: '#FFFFFF',
                    id: 'colors_solid_button_labels',
                    info: 't:settings_schema.colors.settings.colors_solid_button_labels.info',
                    label: 't:settings_schema.colors.settings.colors_solid_button_labels.label',
                    type: 'color',
                },
                {
                    default: '#121212',
                    id: 'colors_accent_1',
                    info: 't:settings_schema.colors.settings.colors_accent_1.info',
                    label: 't:settings_schema.colors.settings.colors_accent_1.label',
                    type: 'color',
                },
                {
                    id: 'gradient_accent_1',
                    label: 't:settings_schema.colors.settings.gradient_accent_1.label',
                    type: 'color_background',
                },
                {
                    default: '#334FB4',
                    id: 'colors_accent_2',
                    label: 't:settings_schema.colors.settings.colors_accent_2.label',
                    type: 'color',
                },
                {
                    id: 'gradient_accent_2',
                    label: 't:settings_schema.colors.settings.gradient_accent_2.label',
                    type: 'color_background',
                },
                {
                    content:
                        't:settings_schema.colors.settings.header__2.content',
                    type: 'header',
                },
                {
                    default: '#121212',
                    id: 'colors_text',
                    info: 't:settings_schema.colors.settings.colors_text.info',
                    label: 't:settings_schema.colors.settings.colors_text.label',
                    type: 'color',
                },
                {
                    default: '#121212',
                    id: 'colors_outline_button_labels',
                    info: 't:settings_schema.colors.settings.colors_outline_button_labels.info',
                    label: 't:settings_schema.colors.settings.colors_outline_button_labels.label',
                    type: 'color',
                },
                {
                    default: '#FFFFFF',
                    id: 'colors_background_1',
                    label: 't:settings_schema.colors.settings.colors_background_1.label',
                    type: 'color',
                },
                {
                    id: 'gradient_background_1',
                    label: 't:settings_schema.colors.settings.gradient_background_1.label',
                    type: 'color_background',
                },
                {
                    default: '#F3F3F3',
                    id: 'colors_background_2',
                    label: 't:settings_schema.colors.settings.colors_background_2.label',
                    type: 'color',
                },
                {
                    id: 'gradient_background_2',
                    label: 't:settings_schema.colors.settings.gradient_background_2.label',
                    type: 'color_background',
                },
            ],
        })
    })
})
export {}

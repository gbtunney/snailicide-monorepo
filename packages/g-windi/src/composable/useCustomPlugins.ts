/* * usePlugins* */
import { rangeStep } from 'ramda-adjunct'
import { DeepNestObject, Plugin } from 'windicss/types/interfaces'
import {
    rangeMapperFunction,
    usePluginUtilities,
} from './usePluginUtilities.js'

export const useCustomPlugins = () => {
    const transformRotatePlugin = (): Plugin => {
        const funcRotateCallback: rangeMapperFunction = (
            _value
        ): DeepNestObject => {
            return {
                [`.rotate-${_value}`]: {
                    transform: `rotate(${_value}deg)`,
                },
            }
        }
        const result: DeepNestObject = usePluginUtilities().rangeMapperCSSinJS(
            rangeStep(360 / 8, -315, 360),
            funcRotateCallback
        )
        return usePluginUtilities().pluginFactory(result)
    }
    const gSVGPlugin = (): Plugin => {
        const gSVG = {
            '.g-svg-fill svg': {
                '& path, & g, & rect, & circle': {
                    fill: 'currentColor',
                },
            },
            '.g-svg svg': {
                display: 'block',
                width: '100%',
                height: '100%',
            },
        }
        return usePluginUtilities().pluginFactory(gSVG)
    }
    const misc = (): Plugin => {
        return usePluginUtilities().pluginFactory({
            '.radius-circle': {
                'border-radius': '100%',
            },
            '.flex-center': {
                'justify-content': 'center',
                'align-items': 'center',
            },
            '.reflect-x': {
                transform: 'scale(-1, 1)',
            },
            '.reflect-y': {
                transform: 'scale(1, -1)',
            },
        })
    }
    const bgOpacityPlugin = (): Plugin => {
        const funcBGCallback: rangeMapperFunction = (
            _value
        ): DeepNestObject => {
            return {
                [`bg-opacity-${_value}`]: {
                    '--tw-bg-opacity': (Math.round(_value) * 0.01).toString(),
                },
            }
        }
        const result: DeepNestObject = usePluginUtilities().rangeMapperCSSinJS(
            rangeStep(10, 10, 100),
            funcBGCallback
        )
        return usePluginUtilities().pluginFactory(result)
    }
    // transformRotatePlugin, gSVGPlugin, bgOpacityPlugin,
    return {
        plugins(): Plugin[] {
            return [
                transformRotatePlugin(),
                bgOpacityPlugin(),
                gSVGPlugin(),
                misc(),
            ]
        },
    }
}
export default useCustomPlugins

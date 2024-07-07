/* * usePluginFactory */
import plugin from 'windicss/plugin'
import type { DeepNestObject, Plugin } from 'windicss/types/interfaces'

export type rangeMapperFunction = (_value: number) => DeepNestObject
export const usePluginUtilities = () => {
    const pluginFactory = (_styles: DeepNestObject): Plugin => {
        //console.log("trying to style", _styles)
        const styles: DeepNestObject = _styles as DeepNestObject
        return plugin(({ addComponents }) => {
            addComponents(styles)
        })
    }
    const rangeMapperCSSinJS = (
        values: number[],
        callback: rangeMapperFunction,
    ) => {
        return values.reduce((accumulator: DeepNestObject, value) => {
            return { ...accumulator, ...callback(value) }
        }, {})
    }
    return { pluginFactory, rangeMapperCSSinJS }
}
export default usePluginUtilities

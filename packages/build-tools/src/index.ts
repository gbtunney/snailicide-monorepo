/* * JSON TYPES and UTILS * */
export { npm } from './npm/index.js'

export type HelloWorld = string | number

const sampleFunc = (value: HelloWorld) => {
    console.log('sampleFunc:: ', value)

    return value
}

export { rollup } from './rollup/index.js'
export type {
    ConfigOptions,
    ConfigPlugin,
    EntryConfig,
    ExportType,
} from './rollup/index.js'

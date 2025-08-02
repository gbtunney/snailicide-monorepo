/* * JSON TYPES and UTILS * */

export type HelloWorld = string | number

const sampleFunc = (value: HelloWorld): HelloWorld => {
    console.log('sampleFunc:: ', value)
    return value
}
export * as contrast from './lib/contrast.js'

export * as utilities from './lib/utilities.js'

export * as validators from './lib/validators.js'

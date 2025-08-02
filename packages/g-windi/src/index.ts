/* * JSON TYPES and UTILS * */

export type HelloWorld = string | number

const sampleFunc = (value: HelloWorld): HelloWorld => {
    console.log('sampleFunc:: ', value)
    return value
}
export * as contrast from './lib/contrast.js'

export * as harmonies from './lib/harmonies.js'

export * as palattes from './lib/palattes.js'

export * from './lib/types.js'

export * as utilities from './lib/utilities.js'

export * as validators from './lib/validators.js'

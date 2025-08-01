/* * JSON TYPES and UTILS * */

export type HelloWorld = string | number

const sampleFunc = (value: HelloWorld): HelloWorld => {
    console.log('sampleFunc:: ', value)
    return value
}

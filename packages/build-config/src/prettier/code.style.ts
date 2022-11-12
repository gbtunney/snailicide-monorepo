import { Options } from 'prettier'

const options: Options = {
    bracketSameLine: true,
    quoteProps: 'consistent',
    singleQuote: true,
    tabWidth: 4,
    semi: false,
    proseWrap: 'never',
}
export const codeStyleOptions = options
export default codeStyleOptions

import { UnResolvedAppOptions, initApp } from './app.js'
import { BaseArgs, base_schema } from './schema.js'

const initFunc = (args: BaseArgs) => {
    if (args.verbose === true) {
        console.warn('RESOLVED APP ARGS: ', args)
    }
}
const OPTIONS: UnResolvedAppOptions = {
    name: 'Example App',
    description: 'This is an example to demonstrate use',
}
const initialize = () => {
    initApp(base_schema, initFunc, OPTIONS)
}
export default initialize()

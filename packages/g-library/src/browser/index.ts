import { isCSSColorSpecial, isNotCSSColorSpecial } from './css.js'
import { getHTMLElementFromString } from './html.js'
import { styledConsoleLog } from './logging.js'
import { renderInlineMarkdown, renderMarkdown } from './markdown.js'

export const htmlUtils = {
    styledConsoleLog,
    getHTMLElementFromString,
    renderMarkdown,
    renderInlineMarkdown,
    isCSSColorSpecial,
    isNotCSSColorSpecial,
}
export default htmlUtils

export { getHTMLElementFromString } from './html.js'
export { styledConsoleLog } from './logging.js'
export { renderMarkdown, renderInlineMarkdown } from './markdown.js'
export { isCSSColorSpecial, isNotCSSColorSpecial } from './css.js'

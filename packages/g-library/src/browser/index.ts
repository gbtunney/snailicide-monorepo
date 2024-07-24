import { isCSSColorSpecial, isNotCSSColorSpecial } from './css.js'
import { getHTMLElementFromString } from './html.js'
import { styledConsoleLog } from './logging.js'
import { renderInlineMarkdown, renderMarkdown } from './markdown.js'

export const htmlUtils = {
    getHTMLElementFromString,
    isCSSColorSpecial,
    isNotCSSColorSpecial,
    renderInlineMarkdown,
    renderMarkdown,
    styledConsoleLog,
}
export default htmlUtils

export { isCSSColorSpecial, isNotCSSColorSpecial } from './css.js'
export { getHTMLElementFromString } from './html.js'
export { styledConsoleLog } from './logging.js'
export { renderInlineMarkdown, renderMarkdown } from './markdown.js'

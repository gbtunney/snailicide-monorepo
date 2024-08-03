import { stringUtils } from '@snailicide/g-library'
import { useStyleTag, UseStyleTagOptions } from '@vueuse/core'
import { join } from 'ramda'
import { ref } from 'vue'
import Processor from 'windicss'
import type { Config } from 'windicss/types/interfaces'

export type windiCSS = typeof useWindiCss
export const useWindiCss = (config: Config = {}) => {
    const processor = ref(new Processor(config))
    const extractStylesFromHTML = (
        el: HTMLElement,
        includeNestedHTML = true,
    ) => {
        const classString = join(' ', Array.from(el.classList))
        const { ignored, success } = processor.value.interpret(classString)
        const { styleSheet } = processor.value.interpret(classString)
        if (includeNestedHTML) {
            const result = compileCSS(el.innerHTML, true)
            if (styleSheet.children.length > 0)
                styleSheet.add(styleSheet.children)
            return result
            // success = [...success, ...html_success]
            //ignored = [...ignored, ...html_ignored]
        }
        //const compiled = html_styleSheet.build()\
        return { ignored, styleSheet, success }
    }
    const interpretWindiStyles = (
        value: Array<string> | string,
        config: Config | undefined = undefined,
        logging = true,
    ) => {
        if (config) processor.value = new Processor(config)

        const val_replaced = stringUtils.replaceCharacters({
            pattern: ['  ', ','],
            replacement: ' ',
            value: value.toString(),
        }) as string
        const val_trimmed = stringUtils.trimCharacters({
            pattern: ['.', "'", '"', '[', ']'],
            value: val_replaced,
        })
        const { ignored, styleSheet, success } =
            processor.value.interpret(val_trimmed)
        const styleSheetCompiled: string | undefined = processor.value.validate(
            val_trimmed,
        )
            ? styleSheet.build(false)
            : undefined
        if (logging) {
            console.log(
                'WindiCSS Processor: ',
                '\nstyleSheet:',
                styleSheet,
                '\nsuccess:',
                success,
                '\nignored::',
                ignored,
                '\nstyleSheetCompiled:\n',
                styleSheetCompiled,
            )
        }
        return {
            ignored,
            styleSheet,
            styleSheetCompiled,
            success,
        }
    }
    const compileCSS = (
        value: Array<string> | string,
        inject: boolean,
        styleTagOptions: UseStyleTagOptions = {},
    ) => {
        const { styleSheetCompiled } = interpretWindiStyles(value)
        if (styleSheetCompiled !== undefined) {
            const result = useStyleTag(styleSheetCompiled, styleTagOptions)
            return result
        }
        return undefined
    }
    const getClassString = (value: Array<string>): string => join(' ', value)
    const masterReg = /\${([\s\S]+?)}/g

    return {
        compileCSS,
        extractStylesFromHTML,
        getClassString,
        interpretWindiStyles,
        masterReg,
    }
}
export default useWindiCss

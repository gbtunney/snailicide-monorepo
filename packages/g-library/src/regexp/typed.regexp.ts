import type { EmptyObject } from 'type-fest'
// Extract all (?<name> ...) group names from a pattern literal
type ExtractGroupNames<Str extends string> =
    Str extends `${string}(?<${infer Name}>${infer Rest}`
        ? Record<Name, string> & ExtractGroupNames<Rest>
        : EmptyObject

// Full typed match result
export type TypedRegexpMatch<Pattern extends string> = {
    0: string
    index: number
    input: string
    groups: ExtractGroupNames<Pattern>
} | null

export type MakeTypedRegexpReturn<PatternString extends string> = RegExp & {
    execTyped(inputText: string): TypedRegexpMatch<PatternString> | null
}

/**
 * Remove whitespace + comments from annotated regex
 */
export function cleanAnnotatedRegex(input: string): string {
    return input
        .replace(/#.*$/gm, '') // remove trailing comments
        .replace(/\s+/g, '') // collapse whitespace/newlines
}

/** Treat a multi-line annotated regex as if it were the cleaned literal. Use only with Typed Regexp. */
export const asAnnotatedPattern = <FlattenedLiteral extends string>(
    _original: string,
    _flattened: FlattenedLiteral,
): FlattenedLiteral => _flattened

export const typedRegexp = <PatternString extends string>(
    patternString: PatternString,
    regularExpressionFlags?: string,
): MakeTypedRegexpReturn<PatternString> => {
    const cleanedPatternSource: string = cleanAnnotatedRegex(patternString)

    const compiledRegularExpression: RegExp = new RegExp(
        cleanedPatternSource,
        regularExpressionFlags,
    )

    return Object.assign(compiledRegularExpression, {
        execTyped(inputText: string): TypedRegexpMatch<PatternString> | null {
            const matchResult: RegExpExecArray | null =
                compiledRegularExpression.exec(inputText)

            if (matchResult === null) {
                return null
            }

            // Infer group types from the annotated pattern string
            const typedGroups: ExtractGroupNames<PatternString> =
                (matchResult.groups ??
                    Object.create(null)) as ExtractGroupNames<PatternString>

            return {
                0: matchResult[0],
                groups: typedGroups,
                index: matchResult.index,
                input: matchResult.input,
            }
        },
    })
}

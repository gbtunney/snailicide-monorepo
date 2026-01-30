import type { PascalCase } from 'type-fest'

export type Predicate<Type = unknown> = (
    inputValue: unknown,
) => inputValue is Type
export type BoolPredicate = (inputValue: unknown) => boolean

/** Split on delimiters & camelCase transitions, then PascalCase. */
const toPascal = (rawName: string): string => {
    const parts: Array<string> = rawName
        .replace(/[_\s-]+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean)
        .flatMap(
            (segment) =>
                segment.match(/[A-Z]?[a-z0-9]+|[A-Z]+(?![a-z])/g) ?? [],
        )
    return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
}

type IsKey<BaseName extends string> = `is${PascalCase<BaseName>}`
type IsNotKey<BaseName extends string> = `isNot${PascalCase<BaseName>}`

export type ValidatorResult<Type, BaseName extends string> = {
    [Key in IsKey<BaseName>]: (inputValue: unknown) => inputValue is Type
} & {
    [Key in IsNotKey<BaseName>]: (inputValue: unknown) => boolean
}

export type BoolValidatorResult<BaseName extends string> = {
    [Key in IsKey<BaseName>]: BoolPredicate
} & {
    [Key in IsNotKey<BaseName>]: BoolPredicate
}

export function factoryValidator<Type, BaseName extends string>(
    predicateFunction: Predicate<Type>,
    baseName: BaseName,
): ValidatorResult<Type, BaseName>
export function factoryValidator<BaseName extends string>(
    predicateFunction: BoolPredicate,
    baseName: BaseName,
): BoolValidatorResult<BaseName>
export function factoryValidator<ValueType, BaseName extends string>(
    predicateFunction: Predicate<ValueType> | BoolPredicate,
    baseName: BaseName,
): ValidatorResult<ValueType, BaseName> | BoolValidatorResult<BaseName> {
    const pascalCaseName = toPascal(baseName) as PascalCase<BaseName>
    const isKeyName: IsKey<BaseName> = `is${pascalCaseName}`
    const isNotKeyName: IsNotKey<BaseName> = `isNot${pascalCaseName}`

    const isFunction: (inputValue: unknown) => boolean = (inputValue) =>
        (predicateFunction as (v: unknown) => boolean)(inputValue)
    const isNotFunction: (inputValue: unknown) => boolean = (inputValue) =>
        !isFunction(inputValue)

    return {
        [isKeyName]: isFunction,
        [isNotKeyName]: isNotFunction,
    } as ValidatorResult<ValueType, BaseName> | BoolValidatorResult<BaseName>
}

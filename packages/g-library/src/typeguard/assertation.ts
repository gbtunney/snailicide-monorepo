export type TypeGuardFunction = (
    value: unknown,
    ...args: Array<unknown>
) => value is unknown

export type TypeGuardParameters<Guard extends TypeGuardFunction> =
    Parameters<Guard>

export type TypeGuardInputValue<Guard extends TypeGuardFunction> =
    TypeGuardParameters<Guard>[0]

export type TypeGuardExtraParameters<Guard extends TypeGuardFunction> =
    TypeGuardParameters<Guard> extends [unknown, ...infer Rest] ? Rest : never

export type TypeGuardNarrowedType<Guard extends TypeGuardFunction> =
    Guard extends (
        value: unknown,
        ...args: Array<unknown>
    ) => value is infer Narrowed
        ? Narrowed
        : never

export type BooleanPredicateFunction = (
    value: unknown,
    ...args: Array<unknown>
) => boolean

/**
 * Builds an assertion from a boolean-returning predicate.
 *
 * Throws a TypeError if the predicate returns false.
 *
 * @category Assertions
 * @example
 *     const isEven = (n: number) => n % 2 === 0
 *     const assertIsEven = predicateToAssertion<number, number>(isEven)
 *     assertIsEven(4) // ok
 *     // assertIsEven(3) // throws TypeError
 *
 * @group Typeguard
 */
export function predicateToAssertion<
    InputValue = unknown,
    Narrowed extends InputValue = InputValue,
    ExtraParameters extends Array<unknown> = Array<unknown>,
>(
    predicate: (value: InputValue, ...args: ExtraParameters) => boolean,
    message = 'Assertion failed',
) {
    return (
        value: InputValue,
        ...args: ExtraParameters
    ): asserts value is Narrowed => {
        if (!predicate(value, ...args)) {
            throw new TypeError(message)
        }
    }
}

/**
 * Builds an assertion from a true type guard.
 *
 * Preserves extra parameters and narrows the input on success. Throws a TypeError on failure.
 *
 * @category Assertions
 * @example
 *     const isStringGuard = (v: unknown): v is string => typeof v === 'string'
 *     const assertIsString2 = guardToAssertion<unknown, string>(isStringGuard)
 *     assertIsString2('ok') // v is string afterwards
 *     // assertIsString2(42)  // throws TypeError
 *
 * @group Typeguard
 */
export function guardToAssertion<
    InputValue = unknown,
    Narrowed extends InputValue = InputValue,
    ExtraParameters extends Array<unknown> = Array<unknown>,
>(
    guard: (value: InputValue, ...args: ExtraParameters) => value is Narrowed,
    message = 'Assertion failed',
) {
    return (
        value: InputValue,
        ...args: ExtraParameters
    ): asserts value is Narrowed => {
        if (!guard(value, ...args)) {
            throw new TypeError(message)
        }
    }
}

# Library organization plan

can you suggest a better way of organizing my library? then we can set up the
tests for each.

## External library ??

- <https://github.com/MikeMcl/decimal.js/> idk maybe
- <https://github.com/MikeMcl/bignumber.js/>

### random crap

- is there way of making some sort of generic factory function that takes a
  validator function (validator:(unknosn)=>bool , name :string ) and returns
  functions named `is${name}` and `isNot${name}` so i can get variables named
  const { isFinate, isNotFinate} = factoryValidator(Math.isFinate, "finate" ) <
  convert functions names to camelcase?

## General notes , types of numbers

```ts
let decimal: number = 6
let hex: number = 0xf00d
let binary: number = 0b1010
let octal: number = 0o744
let big: bigint = 100n

//from GPT:  note convert to dictionary
function detectNumberFormat(str: string) {
  const trimmed = str.trim().toLowerCase()

  if (/^[-+]?0b[01]+$/.test(trimmed))
    return 'binary' | 'octal' | 'hex' | 'decimal'
  if (/^[-+]?0o[0-7]+$/.test(trimmed)) return 'octal'
  if (/^[-+]?0x[0-9a-f]+$/.test(trimmed)) return 'hex'
  if (/^[-+]?\d+(\.\d+)?(e[-+]?\d+)?$/.test(trimmed)) return 'decimal'

  return 'invalid'
}
```

```ts
/** @group Parse */
export const parseStringToNumeric = <Type extends PossibleNumeric>(
  value: Type,
): Numeric | undefined => {
  //|| isNumber(value)
  if (isBigInt<bigint>(value) || isNumber<number>(value)) return value
  if (isString(value)) {
    return parseStringToNumeric(value)
  }
  return undefined
}

const parseBigIntLiteral = (s: string): bigint | undefined => {
  // already matched bigintNumber; strip trailing n then underscores
  const core = sanitizeNumericSeparators(s.slice(0, -1))
  try {
    return BigInt(core.startsWith('+') ? core.slice(1) : core)
  } catch {
    return undefined
  }
}

const parsePrefixedNumber = (
  s: string,
  kind: 'hex' | 'binary',
): number | undefined => {
  const sanitized = sanitizeNumericSeparators(s)
  let num: number
  if (kind === 'hex') num = parseInt(sanitized, 16)
  else
    num =
      parseInt(sanitized.replace(/^([+\-]?0b)/i, ''), 2) *
      (sanitized.startsWith('-') ? -1 : 1)
  return Number.isFinite(num) ? num : undefined
}

const parseDecimalOrScientific = (s: string): number | undefined => {
  const sanitized = sanitizeNumericSeparators(s)
  const n = Number(sanitized)
  return Number.isFinite(n) ? n : undefined
}

///my old function i dont even know if still being used even.(orig called toStringNumeric which was bad name)
export const parseStringToNumeric = <Type extends string>(
  value: Type,
  strictChars: boolean = true,
): Numeric | undefined => {
  if (strictChars && isStringNumeric(value, true)) {
    const trimmedValue = cleanString(value)

    const newNumber = new Number(value).valueOf()

    const _parsedInt = parseInt(trimmedValue)
    const _parsedFloat = parseFloat(trimmedValue)

    if (isNaN(newNumber)) {
      if (
        /[n]$/.test(trimmedValue) &&
        !/[n]/.test(trimmedValue.replace(/[n]$/, ''))
      ) {
        //if ( /[n]/.test(  trimmedValue.replace(/[n]$/ , ""))  ===  false ) {
        //if it ends in 'n' its a bigint ( exampel 0x01n or 2n ) >>> remove n and new BigInt and test its validity
        return BigInt(trimmedValue.replace(/[n]$/, ''))
      } else if (/^\+0x|^-0x|^0x/.test(trimmedValue)) {
        return parseInt(trimmedValue)
      } else {
        return parseFloat(trimmedValue)
      }
    } else {
      if (newNumber === _parsedInt && _parsedInt !== _parsedFloat) {
        return _parsedInt
      } else if (newNumber === _parsedFloat) {
        return _parsedFloat
      } else {
        console.log(
          'THERE HAS BEEN AN ERROR',
          'newNumber',
          newNumber,
          'parsedFLoat',
          _parsedFloat,
          '_parsedInt',
          _parsedInt,
        )
        return undefined
      }
    }
  }

  if (!strictChars && isStringNumeric(value, false)) {
    const regex = new RegExp(/([a-z]|[A-Z]|,|\?|$|\$|!|@|#|%|&)/, 'g')
    const replaced_value = removeAllNewlines(value.toString()).replace(
      regex,
      '',
    )
    if (replaced_value.length > 0) {
      const _pre = replaced_value
      return parseFloat(_pre)
    }
  }
  return undefined
}
```

### Notes ⚠️ Why parseInt() “fails” (or behaves unexpectedly)

- parseInt() is a very loose, legacy parser that:

- Parses only integers (not floats, not scientific notation)

- Reads character-by-character from the start of the string

- Stops parsing at the first invalid character (anything not valid in the given
  radix)

- Ignores trailing garbage (no error, just truncates)

- Ignores leading whitespace and sign

- Interprets prefixes (0x, 0b, etc.) inconsistently depending on radix and spec
  version

- Has no concept of BigInt or arbitrary precision

## My numeric library currently is structured like this: PLEASE SUGGEST A NEWstructure or FORMAT outline

- GOAL: this library needs to be reallt composable, as in smaller functions that
  can be reused to customize stuff , use with zod etc and make things VERY CLEAR
  AND individully testable. with more generic composit function types
- main naming convention is referring to more generic validators and
  parsers/transfr as

```ts
export type Numeric = bigint | number

export type PossibleNumeric = number | bigint | string

//isNumeric(allow unknown, extends PossibleNumeric)
// isPossibleNumeric (value:PossibleNumeric)
//isTrueNumeric (value:Numeric )  and the toNumeric(allow unknown, extends PossibleNumeric) BUT should maybe be narrowed somehow qirh brands idl prefix also .
```

## PARSE.TS -

    - has actual things that parse ONLY strings to actual numeric(bigint,   numbers)

## Transform.ts

    - functions prefixed by To i guess? one of these might be unnessacy. idk . previous i was considering 'parse functions be like 'parseInt or parseFloat or however those work. I know parseint strips non digit trailing characters hense the concept of "strict mode"

## Validators.ts

So there are 2 main of validator category

- things that are already numbers
  - isNumber ( is real number already i guess from ramda adjunct)
  - isBigInt
  - isInteger
  - isFloat
  - isNegative ?
- strings --- following info from your previous
  - the strings need to classified as following ::
    'binary'|'octal'|'hex'|'decimal'

## External library idk if useful ??

- <https://github.com/MikeMcl/decimal.js/> idk maybe
- <https://github.com/MikeMcl/bignumber.js/>

### a way to coallate a 'type' with a

    - types : 'binary'|'octal'|'hex'|'decimal'|'bigint'  and maybe more generic ones like 'scientific' which is combo idk , are ALL numbers considered valid scientific number strings , notation?   does it make sense to add a specific type for exponential also to get more sense making, idk?


    - regexp
    - parser function    (string) =>  number|bigint

    - so it can be used to make a:
    - a generaric factory for a validator function (string)=> resulting type  ( idk, does it make sense to use a brand??) for the type??
    - factory for a parsing  function    ( idk, does it make sense to use a brand??) for the type?? even though it is just a number  - or does it make more sense to brand it with a number type - like RealNumber(idk what to call this )|Int|Float|?Exponential?
    - how do u think i should deal with trailing chracters that can be parsed off? the regexp seems to hate whitesapce and nondigits, but ideally i also  need some explicit way to parse off whitespace and/or units?
        - this function should have sig  validateUnits(value:string)=> bool and true if contains a digit and (possible whitespace)trailing unit string ;after it and trim off arbitrary whitespace and other punctionation. this might be good case for a brand to make number but identify px vs em etc.

The reason for some kind of mappng is that i sometimes use zod and forget what i
am doing so i want to make it clear which type can be parsed by which function -
maybe that is why brands are useful ???

- is there anything that isnt covered in that masterRegexpScientific regexp?
  does this guarentee a string can be parsed to a number|bigint ? is there any
  edge cases besides infinate amd nan ??? what is a word that can be used to
  descript a number type that is guarenteed NOT to be infinate or nan?

```ts
/**
 * Scientific Number (modified) Removed NaN and Infinity from original source. Allows numeric separators (_) in integer,
 * fractional, and exponent digits.
 *
 * @author me
 * @see {@link https://regex101.com/r/oubK67/5 regex101 demo}
 */
export const customScientificNumber =
  /^[+\-]?(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?|\.\d(?:_?\d)*)(?:e[+\-]?\d(?:_?\d)*)?$/i

/**
 * Scientific Number Regexp
 *
 * @see {@link https://regex101.com/r/oubK67/5 regex101 demo}
 */
const masterRegexpScientific =
  /^([+-]?(?:NaN|Infinity|0(?:[bB][01](?:_?[01]+)*|[oO]?[0-7](?:_?[0-7]+)*|[xX][0-9a-fA-F](?:_?[0-9a-fA-F]+)*)|(?:(?:0|0(?:[0-9](?:_?[0-9]+)*)?[89](?:[0-9](?:_?[0-9]+)*)?|[1-9](?:_?[0-9]+)*)(?:\.(?:[0-9](?:_?[0-9]+)*)?)?|\.[0-9](?:_?[0-9]+)*)(?:[eE][+-]?[0-9](?:_?[0-9]+)*)?)|-?(?:0(?:[bB][01](?:_?[01]+)*|[oO][0-7](?:_?[0-7]+)*|[xX][0-9a-fA-F](?:_?[0-9a-fA-F]+)*)?|[1-9](?:_?[0-9]+)*)n)$/gm
```

````sh
# match:
08.123e+0_1
7.123e+0_1
-0xAbc
+0x00F
0b0010_1010
2.
.2
0.
0e0
500n
1_1n
0x0n
10n
0x00n
-1n
018e1
01812.1
08000.
00009.
01911.

# error:
  2
07.123e+0_1
2_
2._2
0e
0070e0
00.
0111.
017e1
017.1
+1n
00n
0.n
.0n
.n
_n
_0n
0_n
1e3n
1ne3
1ne3n





```ts
 console.log(Number.isFinite(10));        // true
    console.log(Number.isFinite(Infinity));  // false
    console.log(Number.isFinite(-Infinity)); // false
    console.log(Number.isFinite(NaN));       // false
    console.log(Number.isFinite("abc"));     // false (not a number)
    console.log(Number.isFinite("10"));      // false (not a number)
    console.log(Number.isFinite(null));      // false (not a number)
````

### TESTS

```ts
import { describe, expect, test } from 'vitest'
import { toNumeric } from './transform.js'
import { isStringNumeric, isPossibleNumeric } from './validators.js'

describe('toNumeric equality (string vs literal)', () => {
  test.each([
    // plain decimals
    ['0', 0],
    ['5', 5],
    ['144', 144],
    ['3.1415', 3.1415],
    ['100000.0', 100000.0],
    ['  222  ', 222],
    // signed decimals
    ['+10', 10],
    ['-10', -10],
    // scientific
    ['1e3', 1000],
    ['1e+3', 1000],
    ['1e-3', 0.001],
    ['7.123e01', 71.23],
    ['0e0', 0],
    ['6.02e23', 6.02e23],
    ['1.0e+0', 1],
    ['8e5', 800000],
    // hex/binary
    ['0xff', 255],
    ['0xFF', 255],
    ['-0xAbc', -0xabc],
    ['+0x00F', 15],
    ['0b1010', 10],
  ])('string->number equals literal: %s => %o', (s, expected) => {
    expect(isStringNumeric(s)).toBe(true)
    expect(isPossibleNumeric(s)).toBe(true)
    const parsed = toNumeric(s)
    expect(typeof parsed).toBe('number')
    expect(parsed).toBeCloseTo(expected as number, 12)
  })

  test.each<[string, bigint]>([
    ['0n', 0n],
    ['10n', 10n],
    ['-1n', -1n],
    ['0x01n', 1n],
  ])('string->bigint equals literal: %s => %s', (s, expected) => {
    expect(isStringNumeric(s)).toBe(true)
    expect(isPossibleNumeric(s)).toBe(true)
    const parsed = toNumeric(s)
    expect(typeof parsed).toBe('bigint')
    expect(parsed).toBe(expected)
  })

  test.each([
    // clearly invalid shapes should not parse
    'e10',
    '1e',
    '1e+',
    '1e-',
    '1ee10',
    '1e--10',
    '1e10px',
    '+e10',
    '-e10',
    '2_',
    '2._2',
    '00.',
  ])('invalid string does not parse: %s', (s) => {
    expect(isStringNumeric(s)).toBe(false)
    expect(isPossibleNumeric(s)).toBe(false)
    expect(toNumeric(s)).toBeUndefined()
  })
})

import { describe, expect, test } from 'vitest'
import {
  scientificNumber,
  hexNumber,
  binaryNumber,
  bigintNumber,
} from './dictionary.js'

//these r regexps raw test
describe('regexp/dictionary', () => {
  describe('scientificNumber', () => {
    test.each([
      '1',
      '1.0',
      '.5',
      '1e3',
      '1e+3',
      '1e-3',
      '7.123e01',
      '0e0',
      '6.02e23',
      '1.0e+0',
      '3.4028236692093846346e+38',
      '8e5',
      // underscores allowed
      '1_000',
      '1_000.0_0',
      '.1_0',
      '1.2_3',
      '1e1_0',
      '7_123.456e-1_2',
      '+1_000.5e+1_0',
      '-.9_9e-0_2',
    ])('valid: %s', (s) => {
      expect(scientificNumber.test(s)).toBe(true)
    })

    test.each([
      'e10',
      '1e',
      '1e+',
      '1e-',
      '1ee10',
      '1e--10',
      '+e10',
      '-e10',
      // bad underscores
      '1__0',
      '1._0',
      '1_.0',
      '1e_2',
      '1e2_',
      '_1',
      '1_',
      '._1',
      '2._2',
      '00.', // trailing dot without fraction
    ])('invalid: %s', (s) => {
      expect(scientificNumber.test(s)).toBe(false)
    })
  })

  describe('hexNumber', () => {
    test.each([
      '0x0',
      '0xff',
      '0xFF',
      '+0xA',
      '-0xAbc',
      '0xdead_beef',
      '0xA_B_C',
    ])('valid: %s', (s) => {
      expect(hexNumber.test(s)).toBe(true)
    })

    test.each([
      '0x', // no digits
      '0xG', // non-hex
      '0x_FF', // leading underscore
      '0xFF_', // trailing underscore
      '0xA__B', // double underscore
    ])('invalid: %s', (s) => {
      expect(hexNumber.test(s)).toBe(false)
    })
  })

  describe('binaryNumber', () => {
    test.each(['0b0', '0b1', '0b1010', '+0b1_0_1', '-0b11_00'])(
      'valid: %s',
      (s) => {
        expect(binaryNumber.test(s)).toBe(true)
      },
    )

    test.each([
      '0b', // no digits
      '0b2', // non-binary
      '0b_10', // leading underscore
      '0b10_', // trailing underscore
      '0b1__0', // double underscore
    ])('invalid: %s', (s) => {
      expect(binaryNumber.test(s)).toBe(false)
    })
  })

  describe('bigintNumber', () => {
    test.each([
      '0n',
      '10101000000n',
      '10n',
      '+1_000n',
      '-0n',
      '0xFFn',
      '-0xA_Bn',
      '0b10_10n',
    ])('valid: %s', (s) => {
      expect(bigintNumber.test(s)).toBe(true)
    })

    test.each([
      '10', // missing n
      '10_n', // underscore before n
      '10n_', // trailing underscore
      '+0xn', // missing digits
      '0x_n', // underscore right after base
      '0bn', // missing digits
      '0b_n', // underscore right after base
      '1__0n', // double underscore
    ])('invalid: %s', (s) => {
      expect(bigintNumber.test(s)).toBe(false)
    })
  })
})
```

and the following test cases are probably woronh but u can get the idea

```ts
import { describe, expect, test } from 'vitest'
import { isBigInt, isNumber } from './../typeguard/utility.typeguards.js'
import { isParsableToNumeric } from './parse.js'
import { toStringNumeric } from './transform.js'
import {
  isNumeric,
  isPossibleNumeric,
  isStringNumeric,
  isValidScientificNumber,
} from './validators.js'

describe('validators', () => {
  test('number and bigint primitives', () => {
    const values: Array<number | bigint> = [
      0xff,
      -0xabc,
      0b0010_1010,
      2,
      0.2,
      0,
      500n,
      11n,
      0n,
      10n,
      -1n,
      +10,
      1.0,
      3.4028236692093846e38,
      // from legacy
      3444.4,
      -3444,
      BigInt('0o377777777777777777'),
    ]
    values.forEach((v) => {
      expect(isNumeric(v)).toBe(true)
      expect(isPossibleNumeric(v)).toBe(true)
      expect(isStringNumeric(v)).toBe(false)
      expect(isValidScientificNumber(v)).toBe(true)
    })
  })

  test('plain numeric strings (strict)', () => {
    const values: string[] = [
      '20.00',
      '20.02',
      '144',
      '5',
      '0',
      '222',
      '100000.0',
      '3.1415',
    ]
    values.forEach((s) => {
      expect(isStringNumeric(s)).toBe(true)
      expect(isPossibleNumeric(s)).toBe(true)
      expect(isNumeric(s)).toBe(false)
      // use loose parsing to handle surrounding spaces consistently
      expect(toStringNumeric(s, false)).not.toBeUndefined()
    })
  })

  test('signed decimal strings (strict accepts leading sign)', () => {
    const signed: string[] = ['+10', '-10']
    signed.forEach((s) => {
      expect(isStringNumeric(s)).toBe(true)
      expect(isPossibleNumeric(s)).toBe(true)
      expect(isNumeric(s)).toBe(false)
      expect(toStringNumeric(s)).not.toBeUndefined()
    })
  })

  test('signed decimal number', () => {
    const signed: number[] = [+10, -10]
    signed.forEach((s) => {
      expect(isPossibleNumeric(s)).toBe(true)
      expect(isNumeric(s)).toBe(true)
    })
  })

  test('valid scientific notation (strings)', () => {
    const sci: string[] = [
      '1e3',
      '1e+3',
      '1e-3',
      '7.123e01',
      '0e0',
      '6.02e23',
      '1.0e+0',
      '3.4028236692093846346e+38',
      '8e5',
      '7.123e+0_1', // underscore in exponent (now valid)
      '7_123.456e-1_2', // underscores integer, fraction, exponent
    ]
    sci.forEach((s) => {
      expect(isValidScientificNumber(s)).toBe(true)
      expect(isStringNumeric(s)).toBe(true)
      expect(isPossibleNumeric(s)).toBe(true)
      expect(isNumeric(s)).toBe(false)
      expect(toStringNumeric(s)).not.toBeUndefined()
    })
  })

  test('hex/binary/bigint strings: strict accepts per dictionary regex', () => {
    const special: string[] = [
      '0xff',
      '0xFF',
      '-0xAbc',
      '+0x00F',
      '0b0010_1010',
      '10n',
      '0x01n',
      '-1n',
      // '0x00n',
    ]
    special.forEach((s) => {
      // Current dictionary regex considers these numeric-like
      //   expect(isStringNumeric(s)).toBe(true)
      //expect(isPossibleNumeric(s)).toBe(true)
      //  expect(toStringNumeric(s)).not.toBeUndefined()
      //  expect(isNumeric(s)).toBe(true)
    })
  })

  test('invalid numeric strings', () => {
    // Keep only unambiguous invalids per current dictionary regex
    const invalid: string[] = [
      // malformed scientific
      'e10',
      '1e',
      '1e+',
      '1e-',
      '1ee10',
      '1e--10',
      '1e10px',
      '+e10',
      '-e10',
      // malformed decimals/ints
      '2_',
      '2._2',
      '00.',
      '7.123e+0__1',
      '7.123e+0__9', // double underscore in exponent
      '_7.1e2', // leading underscore
      '7_.1e2', // underscore before decimal point
      '7._1e2', // underscore immediately after dot
      '7.1e_2', // underscore starts exponent
      '7.1e2_', // trailing underscore exponent
    ]

    invalid.forEach((s) => {
      expect(isStringNumeric(s)).toBe(false)
      expect(isPossibleNumeric(s)).toBe(false)
      expect(isValidScientificNumber(s)).toBe(false)
      expect(toStringNumeric(s)).toBeUndefined()
    })
  })

  test('parsable vs possible (units)', () => {
    expect(isPossibleNumeric('222')).toBe(true)
    expect(isPossibleNumeric(' 222  ')).toBe(true)

    // strict (default) rejects trailing units
    expect(isPossibleNumeric('222px')).toBe(false)
    // loose allows after stripping
    expect(isPossibleNumeric('222px', false)).toBe(true)

    const mixed = ' 200px'
    expect(isParsableToNumeric(mixed)).toBe(true)
    expect(isPossibleNumeric(mixed)).toBe(false)
  })
})

export {}
```

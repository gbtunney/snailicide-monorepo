import semvervalid from 'semver/functions/valid.js'
import type {
    Merge,
    OmitIndexSignature,
    PackageJson,
    RequireAtLeastOne,
} from 'type-fest'
import { z } from 'zod'
import { isMatchRegExp } from './../typeguard/utility.typeguards.js'
import { lookup } from './../regexp/index.js'
import { wrapSchema } from '../zod_helpers/index.js'

type PackageJsonStandard = PackageJson['PackageJsonStandard']
type PackageScripts = PackageJson['scripts']
type TypeScriptConfiguration = PackageJson['TypeScriptConfiguration']

export const isValidSemVer = (value: string) => semvervalid(value)
export const isValidPackageName = (value: string) =>
    isMatchRegExp(value, lookup.validPackageName)

/* * Collection of Generic Package Utility Types  * */
export const basePackage = z.object({
    name: z.string().regex(lookup.validPackageName),
    version: z.string().refine(
        (value) => {
            return semvervalid(value)
        },
        { message: 'Please enter a valid semver' },
    ),
    description: z.string(),
    main: z.string(),
    author: z
        .object({
            name: z.string().optional(),
            email: z.string().email().optional(),
        })
        .optional(),
})

type BasePackage = z.infer<typeof basePackage>

export const parseNPMPackage = <
    S extends z.AnyZodObject,
    BS extends z.AnyZodObject,
>(
    value: unknown,
    schema: S,
    base_schema: z.AnyZodObject = basePackage, //as z.AnyZodObject
): z.infer<Merge<S, BS>> | undefined => {
    const _schema = wrapSchema<z.AnyZodObject>(base_schema).merge(
        wrapSchema<S>(schema),
    )
    if (_schema.safeParse(value).success) {
        return _schema.parse(value)
    }
    return undefined
}

export const tg_NPMPackageCustom = <Schema extends z.ZodTypeAny>(
    schema: Schema,
    value: unknown,
): value is z.infer<Schema> => {
    //  : value is z.infer<base.merge(schema)>
    return schema.safeParse(value).success
}

export const isNPMPackageCustom = <
    T extends z.input<typeof basePackage>,
    Schema extends z.ZodObject<any>,
>(
    value: T,
    schema: Schema,
    base: typeof basePackage = basePackage,
) => {
    const newSchema = base.merge(schema)
    return tg_NPMPackageCustom<typeof newSchema>(newSchema, value)
}

export const isNPMPackage = <S extends z.AnyZodObject>(
    value: unknown,
    schema: undefined | S = undefined, // wrapSchema<z.AnyZodObject>(basePackage)
): value is z.infer<S> => {
    if (schema === undefined) {
        return wrapSchema<z.AnyZodObject>(basePackage).safeParse(value).success
    } else return wrapSchema<S>(schema).safeParse(value).success
}

export namespace NPMPackage {
    type BasePackage = z.infer<typeof basePackage>
    export type RequiredProps = BasePackage
    export type PackageJsonBase<BaseType = PackageJson, strict = true> = Merge<
        strict extends true
            ? OmitIndexSignature<BaseType>
            : PackageJson & BaseType,
        BasePackage
    >
    export type PackageJsonRequiredProps<
        BaseType = PackageJson,
        strict = true,
    > = Merge<
        strict extends true
            ? OmitIndexSignature<BaseType>
            : PackageJson & BaseType,
        BasePackage
    >
    export type LifeCycleScripts = PackageScripts

    export type PackageJsonTypescript<
        BaseType = PackageJsonStandard,
        strict = true,
    > = PackageJsonBase<BaseType, strict> &
        RequireAtLeastOne<
            TypeScriptConfiguration,
            keyof TypeScriptConfiguration
        >
    export type PackageStandard<strict = true> = PackageJsonBase<
        PackageJsonStandard,
        strict
    >
    export type MinimumPackageJson<strict = false> = PackageJsonBase<
        PackageJsonStandard,
        strict
    >

    export type NPMPackageJson = PackageJsonBase<PackageJson, false>
    export type IsPackageJson<
        BaseType = PackageJsonStandard,
        strict = true,
    > = PackageJsonBase<BaseType, strict>

    type PackageScriptsReq<
        requiredProps extends string,
        strict = false,
        BaseType = PackageJsonBase['scripts'],
    > = BaseType extends PackageJsonBase['scripts']
        ? strict extends boolean
            ? strict extends false
                ? Merge<
                      BaseType,
                      {
                          [Property in requiredProps]: string
                      }
                  >
                : {
                      [Property in requiredProps]: string
                  }
            : never
        : never

    export type RequiredPackageScripts<
        requiredProps extends string,
        strict = false,
        BaseType = PackageJsonBase,
    > = BaseType extends PackageJsonBase
        ? Merge<
              BaseType,
              {
                  scripts: PackageScriptsReq<
                      requiredProps,
                      strict,
                      BaseType['scripts']
                  >
              }
          >
        : never
}

export default NPMPackage

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

export const packageStandardSchema = (
    base_schema: z.AnyZodObject = basePackage,
): typeof base_schema => {
    return wrapSchema<z.AnyZodObject>(base_schema)
}
type BasePackage = z.infer<typeof basePackage>

export const parseNPMPackage = <S extends z.AnyZodObject>(
    value: unknown,
    schema: S | undefined = undefined,
    base_schema: z.AnyZodObject = basePackage, //as z.AnyZodObject
): z.infer<Merge<typeof base_schema, S>> | undefined => {
    if (schema !== undefined) {
        const _schema = wrapSchema<z.AnyZodObject>(base_schema).merge(
            wrapSchema<S>(schema),
        )
        if (isNPMPackage<typeof _schema>(value, _schema)) {
            return _schema.parse(value)
        }
    }
    if (isNPMPackage<typeof base_schema>(value, base_schema)) {
        return base_schema.parse(value)
    }
    return undefined
}

export const isNPMPackage = <S extends z.AnyZodObject>(
    value: unknown,
    schema: S | undefined = undefined,
    base_schema: z.AnyZodObject = basePackage, //as z.AnyZodObject
): value is z.infer<Merge<typeof base_schema, S>> | undefined => {
    if (schema !== undefined) {
        const _schema = wrapSchema<z.AnyZodObject>(base_schema).merge(
            wrapSchema<S>(schema),
        )
        return _schema.safeParse(value).success
    }
    return wrapSchema<z.AnyZodObject>(base_schema).safeParse(value).success
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

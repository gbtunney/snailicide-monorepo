// @ts-expect-error doesnt have types
import SemverJS from '@brunorb/semverjs'
import { z } from 'zod'
import { isValidRegExp } from './../typeguard/utility.typeguards.js'

import type {
    Merge,
    OmitIndexSignature,
    PackageJson,
    RequireAtLeastOne,
} from 'type-fest'

type PackageJsonStandard = PackageJson['PackageJsonStandard']
type PackageScripts = PackageJson['scripts']
type TypeScriptConfiguration = PackageJson['TypeScriptConfiguration']
export const validSemVer: RegExp = SemverJS.pattern
export const validPackageName =
    /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

export const isValidSemVer = (value: string) =>
    isValidRegExp(value, validSemVer)
export const isValidPackageName = (value: string) =>
    isValidRegExp(value, validPackageName)

/* * Collection of Generic Package Utility Types  * */

const schemaPackage = z.object({
    name: z.string().regex(validPackageName),
    version: z.string().regex(validSemVer),
    description: z.string(),
    main: z.string(),
    author: z
        .object({
            name: z.string().optional(),
            email: z.string().email().optional(),
        })
        .optional(),
})

type SchemaPackage = z.infer<typeof schemaPackage>

export const tg_NPMPackageCustom = <Schema extends z.ZodTypeAny>(
    schema: Schema,
    value: unknown
): value is z.infer<Schema> => {
    //  : value is z.infer<base.merge(schema)>
    return schema.safeParse(value).success
}

export const isNPMPackageCustom = <
    T extends z.input<typeof schemaPackage>,
    Schema extends z.ZodObject<any>
>(
    value: T,
    schema: Schema,
    base: typeof schemaPackage = schemaPackage
) => {
    const newSchema = base.merge(schema)
    return tg_NPMPackageCustom<typeof newSchema>(newSchema, value)
}

export const isNPMPackage = <
    BaseType extends Merge<PackageJson, SchemaPackage>
>(
    value: BaseType
): value is BaseType => {
    const result = schemaPackage.safeParse(value)
    return result && result.success === true ? true : false
}

export namespace NPMPackage {
    type SchemaPackage = z.infer<typeof schemaPackage>
    export type RequiredProps = SchemaPackage
    export type PackageJsonBase<BaseType = PackageJson, strict = true> = Merge<
        strict extends true
            ? OmitIndexSignature<BaseType>
            : PackageJson & BaseType,
        SchemaPackage
    >
    export type PackageJsonRequiredProps<
        BaseType = PackageJson,
        strict = true
    > = Merge<
        strict extends true
            ? OmitIndexSignature<BaseType>
            : PackageJson & BaseType,
        SchemaPackage
    >
    export type LifeCycleScripts = PackageScripts

    export type PackageJsonTypescript<
        BaseType = PackageJsonStandard,
        strict = true
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
        strict = true
    > = PackageJsonBase<BaseType, strict>

    type PackageScriptsReq<
        requiredProps extends string,
        strict = false,
        BaseType = PackageJsonBase['scripts']
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
        BaseType = PackageJsonBase
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

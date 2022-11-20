// @ts-expect-error doesnt have types
import SemverJS from '@brunorb/semverjs'
import { z } from 'zod'

export const validSemVer: RegExp = SemverJS.pattern
export const validNPMPackageName =
    /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

import {
    Merge,
    OmitIndexSignature,
    PackageJson,
    SetRequired,
    RequireAtLeastOne,
} from 'type-fest'

/* * Collection of Generic Package Utility Types  * */

const schemaPackage = z.object({
    name: z
        .string()
        .regex(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/),
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
    export type LifeCycleScripts = PackageJson.Scripts

    export type PackageJsonTypescript<
        BaseType = PackageJson.PackageJsonStandard,
        strict = true
    > = PackageJsonBase<BaseType, strict> &
        RequireAtLeastOne<
            PackageJson.TypeScriptConfiguration,
            keyof PackageJson.TypeScriptConfiguration
        >
    export type PackageJsonStandard<strict = true> = PackageJsonBase<
        PackageJson.PackageJsonStandard,
        strict
    >

    export type MinimumPackageJson<
        BaseType = PackageJson.PackageJsonStandard,
        strict = false
    > = PackageJsonBase<PackageJson.PackageJsonStandard, strict>

    export type NPMPackageJson = PackageJsonBase<PackageJson, false>
    export type IsPackageJson<
        BaseType = PackageJson.PackageJsonStandard,
        strict = true
    > = PackageJsonBase<BaseType, strict>

    export type RequiredPackageScripts<
        ScriptKeys extends string,
        strict = false
    > = {
        scripts: strict extends true
            ? SetRequired<Pick<PackageJson.Scripts, ScriptKeys>, ScriptKeys>
            : SetRequired<PackageJson.Scripts, ScriptKeys>
    }
}

export default NPMPackage

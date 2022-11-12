/* * Collection of Types for Monorepo Packages * */
import type PackageUtils from './utils'

export namespace Buildable {
    /* * Required Script Keys for BUILDABLE * */
    export type ScriptsRequired = 'build' | 'clean:build'
    export type ScriptsRecommended = ScriptsRequired | 'start' | 'dev'

    /* * Buildable Interface * */
    export type PackageJson<BaseType = PackageUtils.PackageJsonStandard> =
        BaseType & PackageUtils.RequiredPackageScripts<ScriptsRequired>
}

export namespace Lintable {
    /* * Scripts Linting & Formatting (Code Style) * */
    export type ScriptsRequired =
        | 'check'
        | 'fix'
        | 'lint'
        | 'lint:fix'
        | 'prettier'
        | 'prettier:fix'
    export type ScriptsRecommended = ScriptsRequired

    /* * Config - File Extensions (Linting & Formatting) * */
    export type PackageConfig = {
        config: {
            prettier: {
                extensions: string
                path: string
            }
            eslint: {
                extensions: string
                path: string
                config_path: string
            }
        }
        prettier?: string //Direct config path (no file)
    }

    /* * Lintable PackageJson * */
    export type PackageJson<BaseType = PackageUtils.PackageJsonStandard> =
        PackageConfig &
            BaseType &
            PackageUtils.RequiredPackageScripts<ScriptsRequired>
}

import { PackageJson } from 'type-fest'

export type TPackage<T = TPackageScriptsBuild> = {
    scripts: T
}
/* * Scripts BUILD * */
export type TPackageScriptsBuild = {
    'test'?: string
    'build': string
    'clean:build': string
    'start'?: string
}
/* * Buildable Interface * */
export type IBuildable = TPackage<TPackageScriptsBuild>

/* * Scripts Linting & Formatting (Code Style) * */
export type TPackageScriptsCodeStyle = {
    'check': string
    'fix': string
    'lint': string
    'lint:fix': string
    'prettier': string
    'prettier:fix': string
}
/* * Config - File Extensions (Linting & Formatting) * */
export type TPackageConfigCodeStyle = {
    extensions: {
        prettier: string
        eslint: string
    }
}

/* * Lintable Interface * */
export type ILintable = TPackage<TPackageScriptsCodeStyle> &
    TPackageConfigCodeStyle

export const isNPMPackage = <T = PackageJson>(
    value: T extends PackageJson.PackageJsonStandard ? T : never
): T => value

export type { PackageJson }

import {
    isNPMPackage,
    IBuildable,
    ILintable,
    PackageJson,
} from '@snailicide/build-config'
import local_package from './package.json'

/* * Test : is a valid npm package * */
isNPMPackage(local_package)

const isStandardPkg: PackageJson.PackageJsonStandard = local_package
isNPMPackage<PackageJson.PackageJsonStandard>(local_package)

//todo: fix issue with linebreaks and ts-expect-error
type hasTypescriptConfig = PackageJson.PackageJsonStandard &
    PackageJson.TypeScriptConfiguration
// @ts-expect-error should error bc wrong typing property
isNPMPackage<hasTypescriptConfig>({ ...local_package, typings: true })

// @ts-expect-error should error with generic <>
isNPMPackage<ILintable>(local_package)

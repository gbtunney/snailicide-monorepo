import { PackageJson } from 'type-fest'
import type { PackageUtils } from './utils'
export const isNPMPackage = <
    BaseType = PackageJson.PackageJsonStandard,
    strict = true
>(
    value: BaseType extends PackageUtils.PackageJsonBase<BaseType, strict>
        ? BaseType
        : never
): BaseType => value

export type { PackageUtils } from './utils'
export type { Buildable, Lintable } from './build'
export default isNPMPackage

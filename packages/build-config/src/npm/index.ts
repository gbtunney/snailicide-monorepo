/**
 * Collection of Generic NPM Package Utility Schemas and Typeguards
 *
 * @see [NPM - Node Package Manager](https://www.npmjs.com/)
 */
import {
    isNPMPackage,
    packageStandardSchema,
    parseNPMPackage,
} from "./npm.package.js"
import { schemas } from "./schema.js"

/** @internal */
export const npm = {
    isNPMPackage,
    packageStandardSchema,
    parseNPMPackage,
    schemas,
}
export {
    /** Documented! */
    isNPMPackage,
    packageStandardSchema,
    parseNPMPackage,
} from "./npm.package.js"
export type {
    BasePackage,
    PackageJson,
    PackageJsonInput,
} from "./npm.package.js"

export { schemas } from "./schema.js"

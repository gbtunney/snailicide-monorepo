// @ts-expect-error no types
import SemverJS from '@brunorb/semverjs'
import { z } from 'zod'

export const isValidSemVer = (value: string) =>
    SemverJS.isValid(value) ? true : false

export const validSemVer: RegExp = SemverJS.pattern

export const validNPMPackageName =
    /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

export const isValidNPMPackageName = (value: string) =>
    validNPMPackageName.test(value) ? true : false

export const getUnscopedPackageName = (value: string): string | undefined => {
    if (!isValidNPMPackageName(value)) return undefined
    else {
        if (value.startsWith('@') && value.includes('/')) {
            //scoped package
            const [package_scope = undefined, package_name = undefined] =
                value.split('/')
            if (
                package_name !== undefined &&
                validNPMPackageName.test(package_name)
            ) {
                console.error('Error parsing package name!', value)
                return undefined
            }
            return undefined
        }
        return value
    }
}

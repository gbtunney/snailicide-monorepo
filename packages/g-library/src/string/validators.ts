import semvervalid from 'semver/functions/valid.js'

export const isValidSemVer = (value: string) => semvervalid(value)

import { PromptQuestion } from 'node-plop'
import { z } from 'zod'
import type { PackageSchema } from './package-types.js'
import {
    isValidNPMPackageName,
    isValidSemVer,
} from './package-template-helpers.js'
import {
    EnumDescriptionPresets,
    EnumLicenses,
    enumTargetKeys,
    packageSchemaProps,
} from './package-types.js'

export const packagePrompts: PromptQuestion[] = [
    {
        type: 'input',
        name: 'packageName',
        message:
            'Package name (include @prefix if used) example: @snailicide/g-lib :',
        validate: (input: string) =>
            isValidNPMPackageName(input) ||
            'Must enter a valid npm package name',
    },
    {
        type: 'input',
        name: 'version',
        message: 'Version ( semver format) :',
        default: '0.0.1',
        validate: (input: string) =>
            isValidSemVer(input) ||
            'Must enter a valid Semver version format. See https://semver.org',
    },
    {
        type: 'list',
        name: 'target',
        choices: enumTargetKeys(),
        default: enumTargetKeys()[0],
        message: 'Package target:',
    },
    {
        type: 'list',
        name: 'license',
        choices: EnumLicenses,
        default: EnumLicenses[0],
        message: 'License:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Package description:',
        // no reasonable default for node packages
        default: (answers: Partial<PackageSchema>) => {
            if (answers !== undefined && answers.target !== undefined) {
                type EnumPresetKeys = keyof typeof EnumDescriptionPresets
                const _presetKey: EnumPresetKeys =
                    `${answers.target}` as EnumPresetKeys
                return z
                    .nativeEnum(EnumDescriptionPresets)
                    .parse(EnumDescriptionPresets[_presetKey])
            }
            return 'Please enter descripton'
        },
    },
    {
        type: 'input',
        name: 'author_name',
        message: 'Author name:',
        default: 'Gillian Tunney', ///todo: make config obj
    },
    {
        type: 'input',
        name: 'author_email',
        message: 'Author email:',
        default: 'gbtunney@mac.com', ///todo: make config obj
        validate: (input: unknown) => {
            const parseObj =
                packageSchemaProps.author_email.isOptional() && input === ''
                    ? 'i am optional'
                    : packageSchemaProps.author_email.safeParse(input).success
            return parseObj === true ? true : 'Please enter valid email address'
        },
    },
    {
        type: 'input',
        name: 'repositoryOwner',
        message: 'Github Username: ',
        default: 'gbtunney', ///todo: make config obj
    },
    {
        type: 'input',
        name: 'repositoryName',
        message: 'Github Repository Name:',
    },
]

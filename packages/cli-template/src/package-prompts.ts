import { PromptQuestion } from 'node-plop'
import { z } from 'zod'

import {
    isValidNPMPackageName,
    isValidSemVer,
} from './package-template-helpers.js'
import type { PackageSchema } from './package-types.js'
import {
    EnumDescriptionPresets,
    EnumLicenses,
    enumTargetKeys,
    packageSchemaProps,
} from './package-types.js'

export const packagePrompts: Array<PromptQuestion> = [
    {
        message:
            'Package name (include @prefix if used) example: @snailicide/g-lib :',
        name: 'packageName',
        type: 'input',
        validate: (input: string) =>
            isValidNPMPackageName(input) ||
            'Must enter a valid npm package name',
    },
    {
        default: '0.0.1',
        message: 'Version ( semver format) :',
        name: 'version',
        type: 'input',
        validate: (input: string) =>
            isValidSemVer(input) ||
            'Must enter a valid Semver version format. See https://semver.org',
    },
    {
        choices: enumTargetKeys(),
        default: enumTargetKeys()[0],
        message: 'Package target:',
        name: 'target',
        type: 'list',
    },
    {
        choices: EnumLicenses,
        default: EnumLicenses[0],
        message: 'License:',
        name: 'license',
        type: 'list',
    },
    {
        /** No reasonable default for node packages */
        default: (answers: Partial<PackageSchema>) => {
            if (answers !== undefined && answers.target !== undefined) {
                type EnumPresetKeys = keyof typeof EnumDescriptionPresets
                const _presetKey: EnumPresetKeys = answers.target
                return z
                    .nativeEnum(EnumDescriptionPresets)
                    .parse(EnumDescriptionPresets[_presetKey])
            }
            return 'Please enter descripton'
        },
        message: 'Package description:',
        name: 'description',
        type: 'input',
    },
    {
        default: 'Gillian Tunney',
        message: 'Author name:',
        name: 'author_name',
        type: 'input', ///todo: make config obj
    },
    {
        default: 'gbtunney@mac.com',
        message: 'Author email:',
        name: 'author_email',
        /** Todo: make config obj */
        type: 'input',
        validate: (input: unknown) => {
            const parseObj =
                packageSchemaProps.author_email.isOptional() && input === ''
                    ? 'i am optional'
                    : packageSchemaProps.author_email.safeParse(input).success
            return parseObj === true ? true : 'Please enter valid email address'
        },
    },
    {
        default: 'gbtunney',
        message: 'Github Username: ',
        name: 'repositoryOwner',
        type: 'input', ///todo: make config obj
    },
    {
        message: 'Github Repository Name:',
        name: 'repositoryName',
        type: 'input',
    },
]

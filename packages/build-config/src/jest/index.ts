/** An object with Jest options. */

import type { Config } from 'jest'
export const Jest: Config = {
    verbose: true,
    preset: 'ts-jest',
    resolver: 'ts-jest-resolver',
    //todo: dont know if this will break ourside package files
    rootDir: '..',
}
export default Jest
export type JestConfig = Config

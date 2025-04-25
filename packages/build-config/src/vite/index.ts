/**
 * Vite Configuration ( only docserver for now )
 *
 * @module vite
 * @see [Vite - Next Generation Frontend Tooling](https://vitejs.dev/)
 */

import { defineConfig, UserConfig } from 'vite'

/** Vite configuration for documentation server */
export const viteDocServerConfig = (port = 5555): UserConfig => {
    return defineConfig({
        base: './',
        publicDir: './docs',
        root: './docs',
        server: {
            port: port,
            strictPort: true,
        },
    })
}

/** @ignore */
export const vite = {
    docServer: viteDocServerConfig,
}

export type { UserConfig as ViteUserConfig } from 'vite'

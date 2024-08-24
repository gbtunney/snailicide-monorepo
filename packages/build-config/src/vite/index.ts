import { defineConfig, UserConfig } from 'vite'
/**
 * Vite configurations
 *
 * @module vite
 */

/** Vite configuration for documentation server* */
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

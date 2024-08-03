import { defineConfig, UserConfig } from 'vite'
/**
 * Vite configurations
 *
 * @module vite
 */

/** Vite configuration for documentation server* */
export const docServerConfig = (port = 5555): UserConfig => {
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

export const vite = {
    docServer: docServerConfig,
}

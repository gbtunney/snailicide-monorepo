import { defineConfig } from 'vite'

import vitePluginModule from './src/index.js'

export default defineConfig({
    base: './',
    build: {
        emptyOutDir: false,
        minify: false,
        outDir: 'example_theme',
    },
    plugins: [
        vitePluginModule({
            entryPoints: {
                'settings_schema.json': 'settings_schema.js',
            },
            sourceCodeDir: './example_theme_config/global_settings',
            themeRoot: './example_theme',
        }),
    ],
})

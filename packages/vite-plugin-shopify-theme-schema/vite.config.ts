import { defineConfig } from 'vite'

import vitePluginModule from './src/index.js'

export default defineConfig({
    base: './',
    build: {
        minify: false,
        outDir: 'example_theme',
        emptyOutDir: false,
    },
    plugins: [
        vitePluginModule({
            themeRoot: './example_theme',
            sourceCodeDir: './example_theme_config/global_settings',
            entryPoints: {
                'settings_schema.json': 'settings_schema.js',
            },
        }),
    ],
})

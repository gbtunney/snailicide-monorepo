import { defineConfig } from 'vite'

import vitePluginModule from './src/index.js'

export default defineConfig({
    base: './',
    build: {
        emptyOutDir: false,
        manifest: true,
        minify: false,
        outDir: 'example_theme',
    },
    plugins: [
        vitePluginModule({
            modulesDir: './example_modules',
            sections: {
                copy: true,
            },
            snippets: {
                copy: true,
            },
            themeRoot: './example_theme',
        }),
    ],
})

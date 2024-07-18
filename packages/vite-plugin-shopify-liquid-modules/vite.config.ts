import { defineConfig } from 'vite'

import vitePluginModule from './src/index.js'

export default defineConfig({
    base: './',
    build: {
        manifest: true,
        minify: false,
        outDir: 'example_theme',
        emptyOutDir: false,
    },
    plugins: [
        vitePluginModule({
            themeRoot: './example_theme',
            modulesDir: './example_modules',
            snippets: {
                copy: true,
            },
            sections: {
                copy: true,
            },
        }),
    ],
})

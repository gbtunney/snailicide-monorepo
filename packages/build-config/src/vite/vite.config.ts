import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        emptyOutDir: true,
        minify: false,
        rollupOptions: {
            input: 'src/nodes/lower-case/ui.html',
            /*input: {
                'lower-case': 'src/nodes/lower-case/ui.html',
                'lower-case-index':'src/nodes/lower-case/index.ts',
            },*/
        },
    },
    esbuild: {
        format: 'iife',
    },
    plugins: [],
})

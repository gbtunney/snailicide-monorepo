import { defineConfig } from 'vite'

export const vite = {
    docServer: (port = 5555) => {
        return defineConfig({
            server: {
                port: port,
                strictPort: true,
            },
            base: '.',
            publicDir: './docs',
            root: './docs',
        })
    },
}

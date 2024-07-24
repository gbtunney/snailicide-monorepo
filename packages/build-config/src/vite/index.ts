import { UserConfig } from 'vite'

export const vite = {
    docServer: (port = 5555): UserConfig => {
        return {
            base: './',
            publicDir: './docs',
            root: './docs',
            server: {
                port: port,
                strictPort: true,
            },
        }
    },
}

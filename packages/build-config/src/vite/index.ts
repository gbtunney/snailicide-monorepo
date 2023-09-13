import { UserConfig } from 'vite'

export const vite = {
    docServer: (port = 5555): UserConfig => {
        return {
            server: {
                port: port,
                strictPort: true,
            },
            base: '.',
            publicDir: './docs',
            root: './docs',
        }
    },
}

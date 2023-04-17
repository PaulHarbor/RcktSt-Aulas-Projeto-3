import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

//isto abaixo é pro vitest conseguir entender as importações usando @
export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environmentMatchGlobs: [
            ['src/http/controllers/**','prisma']
        ]
    }
})
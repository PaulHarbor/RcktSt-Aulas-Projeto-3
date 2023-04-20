import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

//this below is for vitest to understand imports using @
export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environmentMatchGlobs: [
            ['src/http/controllers/**','prisma']
        ]
    }
})
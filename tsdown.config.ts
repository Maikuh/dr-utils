import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: ['src/**/*.ts', '!src/**/*.test.ts', '!src/global.d.ts'],
    target: 'es2020',
    outDir: 'lib',
    platform: 'neutral',
    dts: true,
    minify: true,
    unbundle: true,
    sourcemap: process.env.NODE_ENV === 'development',
    tsconfig: 'tsconfig.build.json',
})

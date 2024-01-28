import swc from 'unplugin-swc'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		root: './',
		coverage: {
			provider: 'v8',
			reporter: ['lcov', 'text'],
		}
	},
	plugins: [
		swc.vite({
			module: {
				type: 'es6',
			},
		}),
		tsConfigPaths(),
	],
})

/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
	development: {
		baseApi: '/',
		mockApi:
			'https://www.fastmock.site/mock/fef2d4de2b342dd8903e734fa1d3fa95/api',
	},
	test: {
		baseApi: '/',
		mockApi:
			'https://www.fastmock.site/mock/fef2d4de2b342dd8903e734fa1d3fa95/api',
	},
	prod: {
		baseApi: '/',
		mockApi:
			'https://www.fastmock.site/mock/fef2d4de2b342dd8903e734fa1d3fa95/api',
	},
}

export default {
	env,
	mock: true,
	...EnvConfig[env],
}

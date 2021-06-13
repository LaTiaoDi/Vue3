/**
 * axios二次封装
 */
import axios from 'axios'
import config from '@/config'
import router from '@/router'
import { ElMessage } from 'element-plus'

const TOKEN_INVALID = '登陆过期'
const NETWORK_ERROR = '网络错误'
//创建axios实例对象
const service = axios.create({
	baseURL: config.baseApi,
	timeout: 8000,
})
//请求拦截
service.interceptors.request.use((req) => {
	const headers = req.headers
	if (!headers.Authorization) headers.Authorization = 'Bear'
	return req
})
// 响应拦截
service.interceptors.response.use((res) => {
	const { code, data, msg } = res.data
	if (code === 200) {
		return data
	} else if (code === 401) {
		ElMessage.error(TOKEN_INVALID)
		setTimeout(() => {
			router.push('/login')
		}, 15000)
		return Promise.reject(TOKEN_INVALID)
	} else {
		ElMessage.error(msg || NETWORK_ERROR)
		return Promise.reject(msg || NETWORK_ERROR)
	}
})
/**
 * 请求参数
 * @param {*} options
 */
function request(options) {
	options.method = options.method || 'get'
	if (options.method.toLowerCase() === 'get') {
		options.params = options.data
	}
	if (config.env === 'prod') {
		service.defaults.baseURL = config.baseApi
	} else {
		service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
	}
	return service(options)
}
;['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
	request[item] = (url, data, options) => {
		return request({
			url,
			data,
			method: item,
			...options,
		})
	}
})
export default request

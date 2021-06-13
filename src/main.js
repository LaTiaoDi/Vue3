import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import request from './utils/request'

console.log('环境变量=>', import.meta.env)
const app = createApp(App)

app.config.globalProperties.$request = request
app.use(router).use(ElementPlus).mount('#app')

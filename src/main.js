// 替代 main.css 的 main.scss 文件
import './assets/main.scss'  

import { createApp } from 'vue'
import App from './App.vue'

// element-plus 相关内容
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入路由
import router from '@/router/index.js'

// 导入 pinia
import {createPinia} from 'pinia'
// 导入 persist 插件
import { createPersistedState } from 'pinia-persistedstate-plugin'

// 导入中文组件
import locale from 'element-plus/dist/locale/zh-cn.js'

// 页面创建相关代码
const app=createApp(App);
// 使用 pinia，使用 persist 插件
const pinia = createPinia();
const persist=createPersistedState()
pinia.use(persist)
app.use(pinia)
// 使用路由
app.use(router)

// 使用element-plus 和他的中文语言包
app.use(ElementPlus,{locale});

// 必须最后才能挂载，若先挂载，则 app.use 的那些配置都不生效了。
app.mount('#app');



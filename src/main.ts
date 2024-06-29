import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useUmoEditor } from '@umoteam/editor'
import { defaultOptions } from './configs/index'
import 'element-plus/dist/index.css'
import './assets/icon/iconfont.css'
import './style.css'

createApp(App).use(router).use(useUmoEditor, defaultOptions).mount('#app');

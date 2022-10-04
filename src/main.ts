import { createApp } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import './styles/main.css'
import 'uno.css'
// should be less , if want to custom theme
// import '@arco-themes/vue-taolu-publishing-platform/index.less'

const app = createApp(App)
app.use(ArcoVueIcon)
app.mount('#app')

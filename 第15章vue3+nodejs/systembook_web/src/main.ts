import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import store from '@/store/index';

const app = createApp(App)
for(const [key, component] of Object.entries(ElementPlusIconsVue)){
    app.component(key, component)
}
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
createApp(App).mount('#app')

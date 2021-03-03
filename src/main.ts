// @ts-ignore
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker.ts'//做离线缓存任务，只在开发环境中有效
import router from './router/index.ts'
import store from './store/store.ts'
// @ts-ignore
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from '@/https/index.ts'
import global from '@/utils/global.ts'
import 'font-awesome/css/font-awesome.min.css'
import i18n from '@/i18n/index.ts'
import '@/mock/index.ts'

Vue.use(ElementUI);
Vue.use(api);
Vue.config.productionTip = false;
Vue.prototype.global=global;
new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

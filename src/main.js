import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible';
import '@/assets/css/reset.css'
import './assets/font/iconfont.css';
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

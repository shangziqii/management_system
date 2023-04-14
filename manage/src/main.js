import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import store from './store'
/* import { getFileIcon } from 'vue-material-design-icons';

Vue.component('get-file-icon', getFileIcon);
 */
// import { getFileIcon } from 'vue-material-design-icons';
// Vue.component('file-icon', getFileIcon);

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  router
}).$mount('#app')

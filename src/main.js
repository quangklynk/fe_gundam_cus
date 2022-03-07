import Vue from 'vue'
import App from './App.vue'

import router from './router'
import './axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { store } from './store'
import locale from 'element-ui/lib/locale/lang/vi.js'// sửa lang lại
import moment from 'moment'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export const eventBus = new Vue();

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(ElementUI, { locale })
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY HH:mm')
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

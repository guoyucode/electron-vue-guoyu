import Vue from 'vue'
import App from './App'
import router from './router'
import vView from 'vue-view-lazy'
import {update} from "./assets/js/update"
//import store from './store'
//import configData from "./page/js/config_data"

Vue.use(vView)

//饿了么UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.$electron = window.require("electron")

/**
 * 事件总线
 * @type {Vue | CombinedVueInstance<Vue, object, object, object, Record<never, any>>}
 */
window.$EventBus = Vue.prototype.$EventBus = new Vue() //事件总线

window.staticPath = require('path').join("");

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  //store,
  //template: '<App/>',
  mounted() {
    update(this);
  },
}).$mount('#app')

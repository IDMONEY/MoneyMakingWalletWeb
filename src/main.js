import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import VeeValidate from 'vee-validate';

import Default from './layouts/Default.vue'

import {store} from './shared/store'

Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.component("default-layout", Default);

// setup fake backend
import { configureFakeBackend } from './shared/helpers';
configureFakeBackend();

new Vue({  
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

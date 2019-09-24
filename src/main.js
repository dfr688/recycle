import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/reset.scss'
import './assets/js/rem'

// 把封装的axios挂载到原型上
import baseJS from './api'
Vue.prototype.baseJs = baseJS

Vue.config.productionTip = false
import { Button } from 'vant';
Vue.use(Button);

import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);

import { Toast } from 'vant';
Vue.use(Toast);

import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

import { Progress } from 'vant';
Vue.use(Progress);

import { RadioGroup, Radio } from 'vant';
Vue.use(RadioGroup);
Vue.use(Radio);

import { Step, Steps } from 'vant';
Vue.use(Step).use(Steps);

import { ActionSheet } from 'vant';
Vue.use(ActionSheet);

import { Search } from 'vant';
Vue.use(Search);

import { AddressList } from 'vant';
Vue.use(AddressList);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

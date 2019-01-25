import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import App from '@/App.vue';
import store from '@/store';

Vue.use(ElementUI);
Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$state', {
  get(this: Vue) {
    return this.$store.state;
  }
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

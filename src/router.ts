import Vue from 'vue';
import Router from 'vue-router';
import AttendanceBook from '@/views/AttendanceBook.vue';
import CuttingClass from '@/views/CuttingClass.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'attendance-book',
      component: AttendanceBook,
    },
    {
      path: '/cutting-class',
      name: 'cutting-class',
      component: CuttingClass,
    },
  ],
});

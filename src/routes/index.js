import { createRouter, createWebHashHistory } from 'vue-router';
import HomeVue from '../components/HomeVue.vue';
import GraphVue from '../components/GraphVue.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomeVue },
  { path: '/graph/:id', component: GraphVue },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

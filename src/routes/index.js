import { createRouter, createWebHashHistory } from 'vue-router';
import HomeVue from '@/components/Home.vue';
import GraphsVue from '@/components/graphs/Graphs.vue';

const routes = [
  { path: '/', redirect: '/graphs' },
  { path: '/home', component: HomeVue },
  { path: '/graphs', component: GraphsVue },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue'; 
import Principal from './components/Principal.vue';

const routes = [
  { path: '/', redirect: '/inicio' }, 
  { path: '/inicio', name: 'inicio', component: Inicio },
  { path: '/principal', name: 'principal', component: Principal }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

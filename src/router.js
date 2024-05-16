import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue'; 
import Principal from './components/Principal.vue';
import Materias from './components/materias.vue';
import DragAndDrop from './components/dragAndDrop.vue';

const routes = [
  { path: '/', redirect: '/inicio' }, 
  { path: '/inicio', name: 'inicio', component: Inicio },
  { path: '/principal', name: 'principal', component: Principal }, 
  { path: '/materias', name: 'materias', component: Materias},
  { parh: '/dragAndDrop', name: 'dragAndDrop', component: DragAndDrop},

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

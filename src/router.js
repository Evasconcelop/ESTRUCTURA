import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue'; 
import Principal from './components/Principal.vue';
import Materias from './components/materias.vue';
import DragAndDrop from './components/dragAndDrop.vue';
import TopSort  from './components/TopSort.vue';
import Chatbot from './components/Chatbot.vue';

const routes = [
  { path: '/', redirect: '/inicio' }, 
  { path: '/inicio', name: 'inicio', component: Inicio },
  { path: '/principal', name: 'principal', component: Principal }, 
  { path: '/materias', name: 'materias', component: Materias},
  { path: '/dragAndDrop', name: 'dragAndDrop', component: DragAndDrop},
  {path: '/TopSort', name: 'TopSort', component: TopSort},
  {path: '/Chatbot', name: 'Chatbot', component:Chatbot},

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

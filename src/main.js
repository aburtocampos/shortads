import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'; // Importar el router
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap'; // Bootstrap JS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import MasonryWall from '@yeger/vue-masonry-wall';


import './style.css'

const app = createApp(App);

app.use(createPinia()); // Usar Pinia
//app.use(router); // Usar Vue Router

import { useAuthStore } from './stores/auth';
// Inicializar authStore antes de montar la app
const authStore = useAuthStore();
//authStore.initializeAuth();

//app.mount('#app');
authStore.initializeAuth().then(() => {
    app.use(router);
    app.use(MasonryWall);
    app.mount('#app');
  });
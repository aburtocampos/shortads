<template>
  <div id="app" class="bg-cream">
    <!-- Mostrar el navbar solo si el usuario está autenticado -->
    <Navbar />

    <!-- Contenido principal -->
     <div class="container mt-6 pt-2 h-100">
       <router-view />
     </div>
   
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth';
import { computed , ref} from 'vue';
import Navbar from './components/Navbar/Navbar.vue';

// Accede al store
const authStore = useAuthStore();

// Computed para verificar si el usuario está autenticado
const isAuthenticated = computed(() => authStore.isAuthenticated);


</script>

<style>
/* Estilos globales (opcional) */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}
</style>

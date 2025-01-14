<template>
    <div class="">
      <h4>Perfil del Usuario</h4>
      <p>Gestiona tus datos y anuncios desde aquí.</p>
  
      <div v-if="isAuthenticated">
        <h5>Bienvenido, {{ user?.email }}</h5>
      </div>
      <div v-else>
        <p>No estás autenticado. Por favor, <router-link to="/login">inicia sesión</router-link>.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/auth';
  import { computed } from 'vue';
  
  const authStore = useAuthStore();
  const user = computed(() => authStore.user);
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  </script>
  
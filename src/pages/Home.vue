<template>
    <div class="">
      <h4 class="mb-2">Bienvenido a AnunciosApp</h4>
      <p class="">
        Explora los anuncios más recientes publicados por nuestra comunidad.
      </p>
      <hr>
      <AnunciosListHome :anuncios="anuncios" empty-message="No hay anuncios disponibles por ahora. ¡Sé el primero en publicar!" />
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, onUnmounted,ref } from 'vue';
  import { useAnunciosStore } from '../stores/anuncios';
  import AnunciosListHome from '../components/anuncios/AnunciosListHome.vue';

  const store = useAnunciosStore();
const anuncios = computed(() => store.anuncios);

const filters = ref({
  status: true, // Cambia según sea necesario
});
// Cargar anuncios cuando el componente se monte
onMounted(() => {
 // store.loadAnuncios();
  store.startListeningToAnuncios(filters.value); 
});
  
onUnmounted(() => {
  store.stopListening();
});
  </script>
  
  <style>
  /* Estilos específicos para la página Home */
  </style>
  
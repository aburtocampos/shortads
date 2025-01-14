<template>
    <router-link v-if="anuncio" class="card mb-0 text-decoration-none" 
    :to="{
      path: `/anuncios/ver-anuncio/${anuncio.id}`,
      query: { returnTo: '/home'},
        }"
    >
      <div class="card-body">
        <h5 class="card-title">{{ anuncio.titulo }}</h5>
        <p class="card-text">{{ anuncio.descripcion }}</p>
        <p class="card-text text-muted">Precio: {{ anuncio.precio || 'No especificado' }}</p>
      </div>
    </router-link>
    <div v-else class="text-center">
       <p>Cargando anuncio...</p>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';

  // Recibe el anuncio como prop
  const props = defineProps({
    anuncioProp: {
      type: Object,
      required: true,
    },

  });

const anuncio = ref(null);
const route = useRoute();
const router = useRouter();


onMounted(() => {
  // Si el anuncio no se pasa como prop, búscalo en el store por ID

  anuncio.value = props.anuncioProp;

  console.log("anuncio como prop",anuncio);
});


  </script>
  
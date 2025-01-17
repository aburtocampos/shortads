<template>
    <router-link v-if="anuncio" class="card mb-0 text-decoration-none" 
    :to="{
      path: `/anuncios/ver-anuncio/${anuncio.id}`,
      query: { returnTo: '/home'},
        }" >
      <div class="card-body">
        <h6 class="card-title">{{ anuncio.titulo }}</h6>
        <div class="itemscontainer">
          <span v-if="anuncio.mostrarTelefono">
            <i class="bi bi-telephone me-2"></i>
          </span>
          <span v-if="anuncio.ithasWhatsapp">
            <i class="bi bi-whatsapp me-2"></i>
          </span>
          <span v-if="anuncio.mostrarTelegram">
            <i class="bi bi-telegram me-2"></i>
          </span>
          <span v-if="anuncio.precio">
            <i class="bi bi-cash-coin me-2"></i>
          </span>
          <span v-if="anuncio.mostrarUbicacion">
            <i class="bi bi-geo-alt"></i>
          </span>
        </div>
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

 // console.log("anuncio como prop",anuncio);
});


  </script>
  
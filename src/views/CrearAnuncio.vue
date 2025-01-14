<template  >
    <h4>Crear Anuncio</h4>
    <div class="card p-2">
      <AnuncioForm @create-anuncio="createAnuncio" @cancel="cancel"  />
    </div>
</template>
  
<script setup>
import AnuncioForm from '../components/anuncios/AnuncioForm.vue';
import { useRouter } from 'vue-router';
import { useAnunciosStore } from '../stores/anuncios';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';

// Access the router
const router = useRouter();

// Store reference
const store = useAnunciosStore();

// Function to create an anuncio
async function createAnuncio(data) {
  try {
    await store.addAnuncio(data);
    showSuccessAlert('Anuncio creado exitosamente.');
    router.push('/anuncios/mis-anuncios'); // Redirige a la página principal
  } catch (error) {
    showErrorAlert('No se pudo crear el anuncio.',error);
    console.log(error);
    
  }
}

function cancel() {
  router.push('/home'); // Ir al home al cancelar
}

</script>
  
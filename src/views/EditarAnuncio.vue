<template>
  <h3>Editar Anuncio</h3>
  <div class="card p-2">
    <AnuncioForm :anuncio="anuncio" @update-anuncio="updateAnuncio" @cancel="cancel"  />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAnunciosStore } from '../stores/anuncios';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import AnuncioForm from '../components/anuncios/AnuncioForm.vue';

// Referencias a router y route
const router = useRouter();
const route = useRoute();

// Referencia al store
const store = useAnunciosStore();

// Estado local
const anuncio = ref(null);

// Cargar anuncio al montar el componente
onMounted(async () => {
  const id = route.params.id; // Obtén el ID desde la URL
  anuncio.value = store.anuncios.find((a) => a.id === id);

  if (!anuncio.value) {
    try {
      await store.loadAnuncios(); // Recarga los anuncios si no está en memoria
      anuncio.value = store.anuncios.find((a) => a.id === id);
    } catch (error) {
      showErrorAlert('No se pudo cargar el anuncio.');
      router.push('/'); // Redirige a la página de inicio
    }
  }
});

// Método para actualizar el anuncio
async function updateAnuncio(data) {
  try {
    await store.updateAnuncio(anuncio.value.id, data);
    showSuccessAlert('Anuncio actualizado exitosamente.');
    router.push('/anuncios/mis-anuncios');  
  } catch (error) {
    showErrorAlert('No se pudo actualizar el anuncio.');
  }
}

function cancel() {
  router.push('/anuncios/mis-anuncios'); // Ir a "Mis Anuncios" al cancelar
}

</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h4>Editar Categoría</h4>
    <CategoriaForm :categoria="categoria" :isEditing="true" @save="saveCategoria" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriasStore } from '../../stores/categorias';
import { useRoute, useRouter } from 'vue-router';
import CategoriaForm from './CategoriaForm.vue';
import { showSuccessAlert, showErrorAlert } from '../../utils/alerts';

const categoriasStore = useCategoriasStore();
const route = useRoute();
const router = useRouter();

const categoria = ref(null);

onMounted(async () => {
  if (!categoriasStore.categorias.length) {
    await categoriasStore.loadCategorias();
  }
  categoria.value = categoriasStore.categorias.find((c) => c.id === route.params.id);
});

async function saveCategoria(data) {
  try {
    await categoriasStore.editCategoria(route.params.id, data);
    showSuccessAlert("Operación Exitosa");
    router.push('/categorias');
  } catch (err) {
    showErrorAlert(err.message);
    console.error(err.message);
  }
}
</script>
<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h4>Nueva Categoría</h4>
    <CategoriaForm @save="saveCategoria" />
  </div>
</template>

<script setup>
import { useCategoriasStore } from '../../stores/categorias';
import { useRouter } from 'vue-router';
import CategoriaForm from './CategoriaForm.vue';
import { showSuccessAlert, showErrorAlert } from '../../utils/alerts';

const categoriasStore = useCategoriasStore();
const router = useRouter();

async function saveCategoria(data) {
  try {
    await categoriasStore.addCategoria(data);
    showSuccessAlert("Operación Exitosa");
    router.push('/categorias');
  } catch (err) {
    showErrorAlert(err.message)
    console.error(err.message);
  }
}
</script>
<template>
  <div class="card px-2">
    <div class="d-flex align-items-center justify-content-between my-2">
          <h4 class="mb-0" >Gestión de Categorías</h4>
          <router-link class="btn btn-success" to="/categorias/crear"><i class="bi bi-plus-circle"></i> <span class="d-none d-md-inline ms-1">Nueva Categoría</span></router-link>
    </div>
     <hr class="mt-0" />
    <table ref="categoriasTable" class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(categoria, index) in categorias" :key="categoria.id">
          <td>{{ index + 1 }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <router-link class="btn btn-warning btn-sm" :to="`/categorias/editar/${categoria.id}`"><i class="bi bi-pencil-square"></i>
                <span class="d-none d-md-inline ms-1">Editar</span> 
              </router-link>
              <button class="btn btn-danger btn-sm" @click="handleDelete(categoria.id)">
                <i class="bi bi-trash"></i>
                <span class="d-none d-md-inline ms-1">Eliminar</span></button>
          </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useCategoriasStore } from '../../stores/categorias';
import { showSuccessAlert, showErrorAlert,confirmAction } from '../../utils/alerts';
const categoriasStore = useCategoriasStore();
const categorias = computed(() => categoriasStore.categorias);

import DataTable from 'datatables.net-bs5';
const categoriasTable = ref(null); // Referencia a la tabla
let dataTableInstance = null; // Instancia de DataTable

onMounted(async () => {
  await categoriasStore.loadCategorias();

  // Inicializar DataTable después de que los datos estén cargados
  dataTableInstance = new DataTable(categoriasTable.value, {
    responsive: true,
    language: {
      url: '../../../i18n/es-ES.json'
    },
  });
  
});

onBeforeUnmount(() => {
  // Destruir DataTable al desmontar el componente
  if (dataTableInstance) {
    dataTableInstance.destroy();
  }
});

async function handleDelete(id) {
  const isConfirmed = await confirmAction('¿Estás seguro de que deseas eliminar esta categoría?');
  
  if (isConfirmed) {
    try {
      await categoriasStore.removeCategoria(id);

      // Refrescar DataTable
      if (dataTableInstance) {
        const row = [...categoriasTable.value.querySelectorAll('tr')].find((tr) =>
          tr.innerHTML.includes(id)
        );
        if (row) {
          dataTableInstance.row(row).remove().draw();
        }
      }

      // Mostrar alerta de éxito
      showSuccessAlert('La categoría ha sido eliminada exitosamente.');
    } catch (error) {
      // Mostrar alerta de error
      showErrorAlert('Hubo un error al eliminar la categoría.');
      console.error(error);
    }
  }
}
</script>

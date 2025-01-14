<template>

      <table ref="tblReference" class="table"  >
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(anuncio, index) in anuncios" :key="anuncio.id">
            <td>{{ index + 1 }}</td>
            <td>{{ anuncio.titulo }}</td>
            <td>{{ anuncio.descripcion }}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Acciones">
                <button
                  class="btn btn-sm"
                  :class="anuncio.status ? 'btn-danger' : 'btn-success'"
                  @click="$emit('toggle-status', anuncio)"
                >
                  <i :class="anuncio.status ? 'bi bi-x-circle' : 'bi bi-check-circle'"></i>
                  {{ anuncio.status ? 'Desactivar' : 'Publicar' }}
                </button>
                <router-link class="btn btn-dark btn-sm" 
                :to="{ 
            path: `/anuncios/ver-anuncio/${anuncio.id}`, 
            query: { returnTo: $route.fullPath } 
          }"
                >
                  <i class="bi bi-eye"></i>
                  Ver
                </router-link>
                <router-link
                  v-if="!anuncio.status"
                  class="btn btn-warning btn-sm"
                  :to="`/anuncios/editar-anuncio/${anuncio.id}`"
                ><i class="bi bi-pencil-square"></i>
                  Editar
                </router-link>
                <button
                  v-if="!anuncio.status"
                  class="btn btn-danger btn-sm"
                  @click="$emit('delete', anuncio.id)"
                ><i class="bi bi-trash"></i>
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
   
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, watch,computed  } from 'vue';
  import DataTable from 'datatables.net-bs5';
  import { useAnunciosStore } from '../../stores/anuncios';
  const anunciosStore = useAnunciosStore();
  const anuncios = computed(() => anunciosStore.anuncios);

// Emite eventos
defineEmits(['delete', 'toggle-status']);

// Referencia para DataTable
  const tblReference = ref(null); // Referencia a la tabla
  let dataTableInstance = null; // Instancia de DataTable

onMounted(() => {
  
  watch(
  anuncios,
  (newAnuncios, oldAnuncios) => {
    if (newAnuncios.length > 0) {
      if (dataTableInstance) {
        refreshDataTable();
      } else {
        initDataTable();
      }
    } else if (dataTableInstance) {
      dataTableInstance.destroy();
      dataTableInstance = null;
    }
  },
  { immediate: true }
);

});

// Limpia DataTable al desmontar el componente
onBeforeUnmount(() => {
  if (dataTableInstance) {
    dataTableInstance.destroy();
    dataTableInstance = null;
  }
});

// Función para inicializar DataTable
function initDataTable() {
  dataTableInstance = new DataTable(tblReference.value, {
    responsive: true,
    language: {
      url: '../../../i18n/es-ES.json', // Ajusta esta ruta según tus archivos de idioma
    },
  });
}

// Función para refrescar DataTable
function refreshDataTable() {
  if (dataTableInstance) {
    dataTableInstance.destroy();
  }
  initDataTable();
}

  </script>
  
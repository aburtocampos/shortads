<template>
  <div class="card p-2">
    <h4>Mis Anuncios</h4>
    <table ref="tblReference" class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(anuncio, index) in anunciosRef" :key="anuncio.id">
          <td>{{ index + 1 }}</td>
          <td>{{ anuncio.titulo }}</td>
          <td>{{ anuncio.descripcion }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Acciones">
              <button
                class="btn btn-sm"
                :class="anuncio.status ? 'btn-danger' : 'btn-success'"
                @click="toggleStatus(anuncio)"
              >
                <i :class="anuncio.status ? 'bi bi-x-circle' : 'bi bi-check-circle'"></i>
                {{ anuncio.status ? 'Desactivar' : 'Publicar' }}
              </button>
              <router-link
                class="btn btn-dark btn-sm"
                :to="{
                  path: `/anuncios/ver-anuncio/${anuncio.id}`,
                  query: { returnTo: $route.fullPath },
                }"
              >
                <i class="bi bi-eye"></i>
                Ver
              </router-link>
              <router-link
                v-if="!anuncio.status"
                class="btn btn-warning btn-sm"
                :to="`/anuncios/editar-anuncio/${anuncio.id}`"
              >
                <i class="bi bi-pencil-square"></i>
                Editar
              </router-link>
              <button
                v-if="!anuncio.status"
                class="btn btn-danger btn-sm"
                @click="handleDelete(anuncio.id)"
              >
                <i class="bi bi-trash"></i>
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import DataTable from 'datatables.net-bs5';
import { useAnunciosStore } from '../../stores/anuncios';
import { useAuthStore } from '../../stores/auth';
import { showSuccessAlert, showErrorAlert, confirmAction } from '../../utils/alerts';

// Stores
const anunciosStore = useAnunciosStore();
const authStore = useAuthStore();

// Referencias y estados
//const anunciosRef = ref([]);
const anunciosRef = computed(() => anunciosStore.anunciosByUser);
const tblReference = ref(null); // Referencia para la tabla
let dataTableInstance = null; // Instancia de DataTable

// Carga inicial
onMounted(async () => {
  if (authStore.user) {
    await anunciosStore.loadAnunciosByUser(authStore.user.uid);
    console.log("anunciosStore.anunciosByUser",anunciosStore.anunciosByUser);
   // anunciosRef.value = anunciosStore.anunciosByUser;
  }
  watch(
    anunciosRef,
    () => {
      if (anunciosRef.value.length > 0) {
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

// Limpia DataTable al desmontar
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

// Función para manejar eliminación
async function handleDelete(id) {
  const isConfirmed = await confirmAction('¿Estás seguro de que deseas eliminar esta categoría?');
  if (isConfirmed) {
    try {
      await anunciosStore.removeAnuncio(id);
      showSuccessAlert('La categoría ha sido eliminada exitosamente.');
    } catch (error) {
      showErrorAlert('Hubo un error al eliminar la categoría.');
      console.error(error);
    }
  }
}

// Función para cambiar estado
function toggleStatus(anuncio) {
 anunciosStore.toggleStatus(anuncio);
}
</script>

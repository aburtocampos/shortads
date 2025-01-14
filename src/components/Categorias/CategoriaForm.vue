<template>
  <form @submit.prevent="handleSubmit" class="card p-2 w-50">
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre de la Categoría:</label>
      <input
        type="text"
        v-model="form.nombre"
        id="nombre"
        class="form-control"
        placeholder="Ingrese el nombre de la categoría"
        required
      />
      <div v-if="error" class="text-danger">{{ error }}</div>
    </div>
    <div class="d-flex justify-content-between">
      <router-link class="btn btn-dark" to="/categorias">
      <i class="bi bi-x-circle"></i> <span class="d-none d-md-inline">Cancelar</span> 
    </router-link>
    <button type="submit" class="btn btn-primary">
      <i class="bi bi-floppy"></i>
        <span class="d-none d-md-inline ms-2">
          {{ isEditing ? 'Actualizar' : 'Crear' }}
        </span>
    </button>
    </div>
    
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  categoria: {
    type: Object,
    default: null,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['save']);

const form = ref({
  nombre: '',
});

const error = ref('');

// Sincronizar los datos de la prop `categoria` con el formulario
watch(
  () => props.categoria,
  (newCategoria) => {
    if (newCategoria) {
      form.value = { ...newCategoria };
    }
  },
  { immediate: true }
);

async function handleSubmit() {
  error.value = '';
  try {
    emit('save', form.value);
  } catch (err) {
    error.value = err.message || 'Error al guardar la categoría.';
  }
}
</script>

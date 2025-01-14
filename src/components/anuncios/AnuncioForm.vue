<template>
  <form @submit.prevent="handleSubmit" class="">
    <div class="mb-2">
      <label for="titulo" class="form-label">Título</label>
      <input type="text" v-model="form.titulo" id="titulo" class="form-control"
        :class="{ 'is-invalid': tituloExcedido }" maxlength="80" required />
      <div class="form-text text-primary text-end" v-if="!tituloExcedido">
        {{ tituloRestante }} caracteres restantes.
      </div>
      <div class="invalid-feedback text-danger" v-else>
        Has excedido el límite de caracteres permitidos.
      </div>
    </div>
    <div class="mb-2">
      <label for="descripcion" class="form-label">Descripción</label>
      <textarea v-model="form.descripcion" id="descripcion" class="form-control"
        :class="{ 'is-invalid': tituloExcedido }" maxlength="600" required />
      <div class="form-text text-primary text-end" v-if="!tituloExcedido">
        {{ descripcionRestante }} caracteres restantes.
      </div>
      <div class="invalid-feedback text-danger" v-else>
        Has excedido el límite de caracteres permitidos.
      </div>
    </div>
    <div class="mb-2">
      <label for="categoria" class="form-label">Categoría</label>
      <select v-model="form.categoria" id="categoria" class="form-select" required>
        <option value="" selected disabled>Seleccionar...</option>
        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.nombre">
          {{ categoria.nombre }}
        </option>
      </select>
    </div>

    <div class="mb-2">
      <label for="telefono" class="form-label">Teléfono</label>
      <div class="input-group">
        <input type="tel" v-model="form.telefono" id="telefono" class="form-control" maxlength="8"
          @input="form.telefono = form.telefono.replace(/\D/g, '').slice(0, 8)" />
        <div class="input-group-text">
          <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">
            <i class="bi bi-whatsapp me-2"></i>
          </label>
        </div>
        </div>
        
      </div>
    </div>

    <div class="mb-2" v-if="form.categoria.toLocaleLowerCase() == 'ventas'">
      <label for="precio" class="form-label">Precio</label>
      <input type="number" v-model="form.precio" id="precio" class="form-control" />
    </div>
    <div class="form-check mb-3" v-if="form.status">
      <input class="form-check-input" type="checkbox" v-model="form.status" id="status">
      <label class="form-check-label" for="status">
        Estado
      </label>
    </div>
    <div class="my-3 d-flex justify-content-between">
      <button type="button" class="btn btn-dark" @click="cancel">
        <i class="bi bi-x-circle me-1"></i> Cancelar
      </button>
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
import { useCategoriasStore } from '../../stores/categorias';
import { onMounted, computed, ref, watch } from 'vue';
import { useAuthStore } from '../../stores/auth';

// Autenticación
const authStore = useAuthStore();
const usuarioId = computed(() => authStore.user?.uid);

// Categorías
const categoriasStore = useCategoriasStore();
const categorias = ref([]);

// Define props
const props = defineProps({
  anuncio: {
    type: Object,
    default: () => null,
  },
});

// Reactive form state
const form = ref({
  titulo: '',
  descripcion: '',
  categoria: '',
  telefono: '',
  precio: 0,
  status: false,
});

// Computed property for edit mode
const isEditing = computed(() => !!props.anuncio);

const maxTituloLength = 80; // Límite de caracteres para el título
const maxDescriptionLength = 600;
// Computed property para los caracteres restantes
const tituloRestante = computed(() => maxTituloLength - form.value.titulo.length);
const descripcionRestante = computed(() => maxDescriptionLength - form.value.descripcion.length);

// Computed property para verificar si se excede el límite
const tituloExcedido = computed(() => form.value.titulo.length > maxTituloLength);

// Emit event for form submission
const emit = defineEmits(['update-anuncio', 'create-anuncio', 'cancel']);

// Update form when anuncio changes
watch(
  () => props.anuncio,
  (newAnuncio) => {
    if (newAnuncio) {
      form.value = {
        titulo: newAnuncio.titulo || '',
        descripcion: newAnuncio.descripcion || '',
        telefono: newAnuncio.telefono || '',
        categoria: newAnuncio.categoria || '',
        precio: newAnuncio.precio || 0,
        status: newAnuncio.status ?? false,
      };
    }
  },
  { immediate: true }
);

// Handle form submission
function handleSubmit() {
  const anuncioData = {
    ...form.value,
    usuarioId: usuarioId.value, // Incluye el UID del usuario autenticado
  };
  emit(isEditing.value ? 'update-anuncio' : 'create-anuncio', anuncioData);
}

// Cancel action
function cancel() {
  emit('cancel'); // Emit the cancel event
}

// Load categories on mount
onMounted(async () => {
  await categoriasStore.loadCategorias();
  categorias.value = categoriasStore.categorias;
});
</script>

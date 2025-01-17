<template>
  <div v-if="anuncios.length === 0" class="text-center">
    <p>{{ emptyMessage }}</p>
  </div>
  <div v-else>
    <!-- Renderiza en modo masonry -->
    <MasonryWall :items="anuncios" :column-width="250" :gap="16">
      <template #default="{ item }">
        <AnuncioItem :anuncioProp="item" />
      </template>
    </MasonryWall>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch,toRefs,computed  } from 'vue';
import AnuncioItem from './AnuncioItem.vue';
import { useAnunciosStore } from '../../stores/anuncios';
  //const anunciosStore = useAnunciosStore();
 // const anuncios = computed(() => anunciosStore.anuncios);
  
const props = defineProps({
  anuncios: {
    type: Array,
    required: true,
  },
  emptyMessage: {
    type: String,
    default: 'No hay anuncios disponibles.',
  },
});

// Convertir los props en referencias reactivas
const { emptyMessage } = toRefs(props);


onMounted(() => {

  
});


</script>
<style scoped>
.masonry {
  column-count: 3; /* Número de columnas */
  column-gap: 16px; /* Espacio entre columnas */
}
.masonry-column {
  break-inside: avoid; /* Evita que los elementos se corten entre columnas */
  margin-bottom: 16px;
}

.masonry-item .card:hover{
  background-color:rgba(80, 167, 255, 0.1);
}

</style>
<template>
    <div>
        <input
    type="text"
     v-model="query"
    placeholder="Buscar anuncios..."
    class="form-control"
  />
    </div>
   
</template>

<script setup>

import { ref, watch } from 'vue';
import { useSearchStore } from '../../stores/useSearchStore';

const searchStore = useSearchStore();
const query = ref(searchStore.searchQuery);

watch(query, (newQuery) => {
  searchStore.setSearchQuery(newQuery); // Actualiza el término en el store
});
</script>

<style scoped>
.search-input {

  padding: 0.5rem;
  font-size: 1rem;
}
</style>
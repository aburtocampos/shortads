// src/stores/search.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref('');

  // Actualiza el término de búsqueda
  function setSearchQuery(query) {
    console.log('Valor de búsqueda actualizado:', query); // Depuración
    searchQuery.value = query;
  }

  return {
    searchQuery,
    setSearchQuery,
  };
});

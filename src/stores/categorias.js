import { defineStore } from 'pinia';
import { fetchCategorias, createCategoria, updateCategoria, deleteCategoria } from '../services/categorias';

export const useCategoriasStore = defineStore('categorias', {
  state: () => ({
    categorias: [],
    isLoaded: false,
  }),
  
  actions: {
    async loadCategorias() {
      if (!this.isLoaded) {
        this.categorias = await fetchCategorias();
        this.isLoaded = true;
      }
    },

    async addCategoria(categoria) {
      // Verificar si el nombre de la categoría ya existe
      const exists = this.categorias.some((c) => c.nombre.toLowerCase() === categoria.nombre.toLowerCase());
      if (exists) {
        throw new Error('El nombre de la categoría ya existe.');
      }

      const newCategoria = await createCategoria(categoria);
      this.categorias.push(newCategoria);
    },

    async editCategoria(id, data) {
       // Verificar si el nuevo nombre ya está en uso por otra categoría
       const exists = this.categorias.some(
        (c) => c.id !== id && c.nombre.toLowerCase() === data.nombre.toLowerCase()
      );
      if (exists) {
        throw new Error('El nombre de la categoría ya existe.');
      }

      await updateCategoria(id, data);
      const index = this.categorias.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.categorias[index] = { id, ...data };
      }
    },

    async removeCategoria(id) {
      await deleteCategoria(id);
      this.categorias = this.categorias.filter((c) => c.id !== id);
    },
  },
});

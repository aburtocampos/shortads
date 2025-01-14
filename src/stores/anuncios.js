import { defineStore } from 'pinia';
import { fetchAnunciosByUser,fetchAnuncios,listenToAnuncios, createAnuncio,updateAnuncio as updateAnuncioAPI  } from '../services/anuncios';

export const useAnunciosStore = defineStore('anuncios', {
  state: () => ({
    anuncios: [],
    anunciosByUser: [],
    isLoaded: false,
    unsubAnuncios: null, 
  }),
  
  actions: {
    async loadAnuncios() {
      this.anuncios = await fetchAnuncios();
    },

    async loadAnunciosByUser(usuarioId) {
      this.anunciosByUser = await fetchAnunciosByUser(usuarioId);
      console.log("msi anuncios",this.anuncios);
      this.isLoaded = true;
    },

    async addAnuncio(anuncio) {
      try {
        const newAnuncio = await createAnuncio(anuncio);
        console.log("newAnuncio",newAnuncio);
        this.anuncios.push(newAnuncio);
      } catch (error) {
        console.log("error",error);
        
      }
    },

    async updateAnuncio(id, data) {
      await updateAnuncioAPI(id, data);
      const index = this.anuncios.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.anuncios[index] = { id, ...data };
      }
    },

    async toggleStatus(anuncio) {
      try {
        const newStatus = !anuncio.status;
        await updateAnuncioAPI(anuncio.id, { status: newStatus });
        // Actualiza el array general de anuncios
        const index = this.anuncios.findIndex((a) => a.id === anuncio.id);
        if (index !== -1) {
          this.anuncios[index].status = newStatus;
        }
        // Actualiza el array específico de anunciosByUser
        const indexByUser = this.anunciosByUser.findIndex((a) => a.id === anuncio.id);
        if (indexByUser !== -1) {
          this.anunciosByUser[indexByUser].status = newStatus;
        }
      } catch (error) {
        console.error('Error al cambiar el estado:', error);
      }
    },

    startListeningToAnuncios(filters = {}) {
      this.stopListening(); // Detén cualquier listener previo

      // Llama al servicio pasando los filtros
      this.unsubAnuncios = listenToAnuncios(filters, (data) => {
        this.anuncios = data; // Actualiza el estado con los datos filtrados
      });
    },

    stopListening() {
      if (this.unsubAnuncios) {
        this.unsubAnuncios(); // Detiene el listener
        this.unsubAnuncios = null;
      }
    },


  },
});

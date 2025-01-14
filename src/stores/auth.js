import { defineStore } from 'pinia';
import { auth } from '../services/firebase';
import { login, register, logout } from '../services/auth';

let isRegistering = false; // Variable global en el archivo authStore

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    superAdminUIDs: ['sKjCV4RkztTZmQeJ4zRfXFIHClc2', 'SUPERADMIN_UID_2'], // UIDs de superadmins
  }),
  getters: {
     // Verificar si el usuario es superadmin
    isSuperAdmin(state) {
      return state.user && state.superAdminUIDs.includes(state.user.uid);
    },
  },
  actions: {

     // Acción para iniciar sesión
    async loginUser(credentials) {
      try {
        const user = await login(credentials.email, credentials.password);
        this.user = user;
        this.isAuthenticated = true;
        localStorage.setItem('authUser', JSON.stringify(user)); // Guarda el usuario en localStorage
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        throw error; // Propaga el error para que el componente lo maneje
      }
    },

     // Acción para registrar un nuevo usuario
     async registerUser(credentials) {
      try {
        isRegistering = true; // Marca el inicio del registro
        await register(credentials.email, credentials.password);
      } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        throw error; // Propaga el error para manejo en el componente
      }finally {
        isRegistering = false; // Siempre resetea la variable
      }
    },

      // Acción para cerrar sesión
      async logoutUser() {
        try {
          await logout(); // Llama al servicio de Firebase para cerrar sesión
          localStorage.removeItem('authUser'); // Limpia localStorage
          this.user = null; // Resetea el estado de Pinia
          this.isAuthenticated = false;
        } catch (error) {
          console.error('Error al cerrar sesión:', error.message);
          throw error;
        }
      },

// Inicializar el estado de autenticación al cargar la app
 /*  initializeAuth() {
    auth.onAuthStateChanged((user) => {
      if (isRegistering) {
        // Si estamos registrando, ignoramos esta autenticación automática
        return;
      }
      
        if (user) {
          localStorage.setItem('authUser', JSON.stringify(user)); // Guarda usuario en localStorage
          this.user = user; // Actualiza el estado de Pinia
          this.isAuthenticated = true;
        } else {
          localStorage.removeItem('authUser'); // Limpia localStorage si no hay usuario
          this.user = null;
          this.isAuthenticated = false;
        }
      });

      // Al cargar la aplicación, verifica si ya hay un usuario en localStorage
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        this.user = JSON.parse(storedUser); // Restaura el usuario desde localStorage
        this.isAuthenticated = true;
      }
    }
*/

initializeAuth() {
  if (this._isInitialized) return Promise.resolve(); // Evita inicializaciones repetidas

  this._isInitialized = true;

  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('authUser', JSON.stringify(user));
        this.user = user;
        this.isAuthenticated = true;
      } else {
        localStorage.removeItem('authUser');
        this.user = null;
        this.isAuthenticated = false;
      }
      resolve(); // Marca que la inicialización ha terminado
    });

    // Maneja el usuario almacenado en localStorage
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isAuthenticated = true;
    }
    resolve();
  });
}


  },
});

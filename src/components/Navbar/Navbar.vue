
<script setup>
import { useAuthStore } from '../../stores/auth';
import { computed } from 'vue';
import { showErrorAlert } from '../../utils/alerts';
import { useRouter } from 'vue-router';

// Accede al store
const authStore = useAuthStore();
const router = useRouter();
// Computed para verificar si el usuario está autenticado
const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const isSuperAdmin = computed(() => authStore.isSuperAdmin);

const logout = async () => {
  try {
    await authStore.logoutUser(); // Llama al método de cierre de sesión del store
    router.push('/login'); // Redirige al login
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
    showErrorAlert('No se pudo cerrar la sesión. Intenta nuevamente.');
  }
};

</script>


<template src="./Navbar.html" />
<style src="./Navbar.css" scoped />
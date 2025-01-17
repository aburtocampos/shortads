<template>
  <section class="registerContainer">
    <div class="card mb-3">
      <div class="card-body">
      <h5 class="card-title text-center mb-3">Registrarse</h5>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input type="email" v-model="email" class="form-control" id="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" v-model="password" class="form-control" id="password" required />
        </div>
        <div class="d-grid gap-2 text-center">
        <button type="submit" class="btn btn-success btn-block">Registrarse</button>
        <p>Si ya tiene una cuenta,  <router-link class="btn-link" to="/login"><i class="bi bi-box-arrow-left me-1"></i>Iniciar Sesión</router-link></p>
      </div>
      </form>
    </div>
    </div>
  </section>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/auth';
  import { showSuccessAlert, showErrorAlert } from '../utils/alerts';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async handleRegister() {
        try {
          const authStore = useAuthStore();
          await authStore.registerUser({ email: this.email, password: this.password });
          showSuccessAlert('Registro exitoso. Ahora puedes iniciar sesión.');
          this.$router.push('/home');
        } catch (error) {
          showErrorAlert('Error al registrarse: ' + error.message);
        }
      },
    },
  };
  </script>
    <style scoped>
    .registerContainer{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      padding-bottom: 7rem;
    }
    .registerContainer .card{
      width: 23rem;
    }
    </style>
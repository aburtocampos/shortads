<template>
  <section class="loginContainer">
      <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title text-center mb-3">Inicio de Sesión</h5>
      <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input type="email" v-model="email" class="form-control" id="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" v-model="password" class="form-control" id="password" required />
          </div>
          <div class="d-grid gap-2 text-center">
          <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
          <p>Si no tiene una cuenta,  <router-link class="btn-link" to="/register"><i class="bi bi-box-arrow-left me-1"></i>Crear Cuenta</router-link></p>
        </div>
        </form>
        
    </div>
  </div>
  </section>

</template>
  
  <script>
  import { useAuthStore } from '../stores/auth';
  import { showErrorAlert } from '../utils/alerts';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const authStore = useAuthStore();
          await authStore.loginUser({ email: this.email, password: this.password });
          this.$router.push('/home');
        } catch (error) {
          showErrorAlert('Error al iniciar sesión: ' + error.message);
        }
      },
    },
  };
  </script>
  <style scoped>
  .loginContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-bottom: 7rem;
  }
  .loginContainer .card{
    width: 23rem;
  }
  </style>
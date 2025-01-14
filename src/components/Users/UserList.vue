<template>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <span :class="user.status === 'activo' ? 'text-success' : 'text-danger'">
              {{ user.status }}
            </span>
          </td>
          <td>
            <button class="btn btn-warning btn-sm" @click="changeStatus(user.id, 'activo')">Activar</button>
            <button class="btn btn-secondary btn-sm" @click="changeStatus(user.id, 'baja')">Dar de Baja</button>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(user.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
</template>
  
  <script setup>
  import { useUsersStore } from '../../stores/users';
  import { onMounted } from 'vue';
  import { showSuccessAlert, confirmAction } from '../../utils/alerts';
  
  // Store
  const usersStore = useUsersStore();
  const users = usersStore.users;
  
  // Cargar usuarios al montar el componente
  onMounted(async () => {
    await usersStore.loadUsers();
  });
  
  // Cambiar estado de usuario
  const changeStatus = async (id, status) => {
    await usersStore.changeUserStatus(id, status);
    showSuccessAlert('Estado actualizado exitosamente.');
  };
  
  // Confirmar y eliminar usuario
  const confirmDelete = async (id) => {
    const confirmed = await confirmAction('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmed) {
      await usersStore.removeUser(id);
      showSuccessAlert('Usuario eliminado exitosamente.');
    }
  };
  </script>
  
<template>
    <div class="">
      <h4>Administración de Usuarios</h4>
      <UserList />
    </div>
  </template>
  
  <script>
  import UserList from '../components/Users/UserList.vue';
  
  export default {
    components: {
      UserList,
    },
  };
  </script>
  
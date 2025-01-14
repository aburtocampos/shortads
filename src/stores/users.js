import { defineStore } from 'pinia';
import { fetchUsers, updateUserStatus, deleteUserFromFirestore } from '../services/users';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  actions: {
    async loadUsers() {
      this.users = await fetchUsers();
    },
    async changeUserStatus(id, status) {
      await updateUserStatus(id, status);
      const user = this.users.find((u) => u.id === id);
      if (user) user.status = status;
    },
    async removeUser(id) {
      await deleteUserFromFirestore(id);
      this.users = this.users.filter((u) => u.id !== id);
    },
  },
});

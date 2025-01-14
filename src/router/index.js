import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';


const routes = [
  { path: "/", redirect: (to) => {
    const authStore = useAuthStore();
    authStore.initializeAuth();
    console.log("revisando",authStore.isAuthenticated);
    return authStore.isAuthenticated ? '/home' : '/login';
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../pages/Register.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../pages/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../pages/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/anuncios/ver-anuncio/:id",
    name: "AnuncioDetalle",
    component: () => import("../components/anuncios/AnuncioDetalle.vue"),
    meta: { requiresAuth: true },
  },
 /* {
    path: "/anuncios/ver-anuncio-detalle/:id",
    name: "AnuncioDetalle",
    component: () => import("../components/anuncios/AnuncioDetalle.vue"),
    meta: { requiresAuth: true },
  },*/
  {
    path: "/anuncios/crear-anuncio",
    name: "CrearAnuncio",
    component: () => import("../views/CrearAnuncio.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/anuncios/editar-anuncio/:id",
    name: "EditarAnuncio",
    component: () => import("../views/EditarAnuncio.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin-users",
    name: "AdminUsers",
    component: () => import("../views/AdminUsers.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/categorias",
    name: "CategoriasList",
    component: () => import("../components/Categorias/CategoriasList.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/categorias/crear",
    name: "CrearCategoria",
    component: () => import("../components/Categorias/CrearCategoria.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/categorias/editar/:id",
    name: "EditarCategoria",
    component: () => import("../components/Categorias/EditarCategoria.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/anuncios/mis-anuncios",
    component: () => import("../components/misanuncios/MisAnuncios.vue"),
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("../pages/NotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.initializeAuth();
  const isAuthenticated = authStore.isAuthenticated;
  const isSuperAdmin = authStore.isSuperAdmin;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirige al login si no está autenticado
  } else if (to.meta.requiresAdmin && !isSuperAdmin) {
    next('/home'); // Redirige a home si no es superadmin
  } else {
    next(); // Permite el acceso
  }
});

export default router;

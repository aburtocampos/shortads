import { auth } from './firebase';
import { db } from './firebase'; // Asegúrate de importar correctamente Firestore
import { setDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Iniciar sesión
export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son obligatorios.');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    throw new Error('No se pudo iniciar sesión. Verifica tus credenciales.');
  }
};

// Registrar un nuevo usuario y sincronizar con Firestore
export const register = async (email, password, role = 'user') => {
  if (!email || !password) {
    throw new Error('Email y contraseña son obligatorios.');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos del usuario en Firestore
    await setDoc(doc(db, 'usuarios', user.uid), {
      email: user.email,
      role, // Rol: 'user', 'admin', etc.
      status: 'activo', // Estado inicial
      createdAt: new Date(), // Fecha de creación
    });

   // return user;
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    throw new Error('No se pudo registrar el usuario. Intenta nuevamente.');
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
    throw new Error('No se pudo cerrar la sesión. Intenta nuevamente.');
  }
};

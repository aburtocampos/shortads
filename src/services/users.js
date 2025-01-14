import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const usersCollection = collection(db, 'usuarios');

// Obtener todos los usuarios de Firestore
export const fetchUsers = async () => {
  const snapshot = await getDocs(usersCollection);
  console.log("snapshot",snapshot);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Cambiar el estado de un usuario
export const updateUserStatus = async (id, status) => {
  const userRef = doc(db, 'usuarios', id);
  await updateDoc(userRef, { status });
};

// Eliminar un usuario de Firestore
export const deleteUserFromFirestore = async (id) => {
  const userRef = doc(db, 'usuarios', id);
  await deleteDoc(userRef);
};

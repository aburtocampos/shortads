import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, query, where, doc,onSnapshot } from 'firebase/firestore';

const anunciosCollection = collection(db, 'anuncios');

// Obtener anuncios por usuario
export const fetchAnunciosByUser = async (usuarioId) => {
  const q = query(anunciosCollection, where('usuarioId', '==', usuarioId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Obtener todos los anuncios
export const fetchAnuncios = async () => {
  const snapshot = await getDocs(anunciosCollection);
  console.log("msi anuncios snapshot",snapshot);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log("msi anuncios data",data);
  return data;
};

export const listenToAnuncios = (filters,callback) => {
  let queryRef = anunciosCollection;
  if (filters.status) {
    queryRef = query(queryRef, where("status", "==", filters.status));
  }

  return onSnapshot(queryRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data); // Llama al callback con los datos actualizados
  });
};

// Crear un anuncio
export const createAnuncio = async (anuncio) => {
  const docRef = await addDoc(anunciosCollection, {
    ...anuncio,
    createdAt: new Date(),
  });
  return { id: docRef.id, ...anuncio };
};

// Editar un anuncio
export const updateAnuncio = async (id, data) => {
  const anuncioRef = doc(db, 'anuncios', id);
  await updateDoc(anuncioRef, data);
};

// Eliminar un anuncio
export const deleteAnuncio = async (id) => {
  const anuncioRef = doc(db, 'anuncios', id);
  await deleteDoc(anuncioRef);
};

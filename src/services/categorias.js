import { db } from './firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Referencia a la colección "categorias"
const categoriasCollection = collection(db, 'categorias');

// Obtener todas las categorías
export const fetchCategorias = async () => {
  const snapshot = await getDocs(categoriasCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Crear una categoría
export const createCategoria = async (categoria) => {
  const docRef = await addDoc(categoriasCollection, {
    ...categoria,
    createdAt: new Date(),
  });
  return { id: docRef.id, ...categoria };
};

// Actualizar una categoría
export const updateCategoria = async (id, data) => {
  const categoriaRef = doc(db, 'categorias', id);
  await updateDoc(categoriaRef, data);
};

// Eliminar una categoría
export const deleteCategoria = async (id) => {
  const categoriaRef = doc(db, 'categorias', id);
  await deleteDoc(categoriaRef);
};

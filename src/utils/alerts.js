import Swal from 'sweetalert2';

// Mostrar una alerta de éxito
export const showSuccessAlert = (message) => {
  Swal.fire({
    title: '¡Éxito!',
    text: message,
    icon: 'success',
    confirmButtonText: 'Cerrar',
  });
};

// Mostrar una alerta de error
export const showErrorAlert = (message) => {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    confirmButtonText: 'Cerrar',
  });
};

// Mostrar una confirmación
export const confirmAction = async (message) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: message || 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
  });
  return result.isConfirmed;
};
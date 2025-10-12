import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/usuarios/';

// Verifica que el token exista antes de enviarlo
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    console.warn('⚠️ No se encontró access_token en localStorage');
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// Crear usuario (requiere is_staff=True)
export const crearUsuario = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Obtener lista de usuarios
export const getUsuarios = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Actualizar usuario
export const actualizarUsuario = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, data, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Eliminar usuario
export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Manejo de errores de autenticación
const handleAuthError = (error) => {
  if (error.response?.status === 401) {
    alert('⚠️ No estás autenticado. Inicia sesión nuevamente.');
  } else if (error.response?.status === 403) {
    alert('🚫 No tienes permisos para realizar esta acción.');
  } else {
    console.error('Error en la solicitud:', error);
  }
};
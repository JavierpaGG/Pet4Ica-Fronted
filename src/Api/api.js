// api.js (tu archivo de configuración de Axios)
import axios from 'axios';

// Crear una instancia de Axios con la configuración base
const api = axios.create({
  baseURL: 'http://192.168.1.9:8080/api/', // Cambia esto si el puerto o la URL de tu backend cambia
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleAxiosError = (error) => {
  console.error(`Error en la solicitud ${error.config.method.toUpperCase()}:`, error);
  throw error; // Lanza el error para que pueda ser manejado por el llamador
};

// Función para construir la URL de las imágenes
export const getImageUrl = (imagePath) => {
  return `http://192.168.1.9:8080/api/mascotas/images/${imagePath}`;
};

// Método POST (Crear)
export const createData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data; // Devolver los datos de la respuesta
  } catch (error) {
    handleAxiosError(error);
  }
};

// Método GET (Leer)
export const getData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data; // Devolver los datos de la respuesta
  } catch (error) {
    handleAxiosError(error);
  }
};

// Método PUT (Actualizar)
export const updateData = async (endpoint, data, config) => {
  try {
    const response = await api.put(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud PUT:', error);
    throw error;
  }
};


// Método DELETE (Eliminar)
export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data; // Devolver los datos de la respuesta
  } catch (error) {
    handleAxiosError(error);
  }
};

// Método para obtener comentarios
export const getComments = async (postId) => {
  if (!postId) {
    console.error('Error: postId is null or undefined');
    return;
  }
  
  try {
    const response = await api.get(`publicaciones/${postId}/comentarios`);
    return response.data;
  } catch (error) {
    console.error(`Error en la solicitud GET:`, error.message);
    if (error.response) {
      console.log('Error Response Data:', error.response.data);
    }
    throw error;
  }
};

// Método para agregar comentarios
export const addComment = async (postId, cuerpo, email, nombre, config) => {
  try {
    const response = await api.post(`publicaciones/${postId}/comentarios`, { cuerpo, email, nombre }, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};




export default api;

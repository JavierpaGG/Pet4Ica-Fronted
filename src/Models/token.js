import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export const guardarTokenDeAcceso = async (token) => {
  try {
    await AsyncStorage.setItem('@tokenDeAcceso', token);
  } catch (error) {
    console.error('Error al guardar el token de acceso:', error);
  }
};

export const obtenerTokenDeAcceso = async () => {
  try {
    const token = await AsyncStorage.getItem('@tokenDeAcceso');
    return token;
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error);
    return null;
  }
};

export const eliminarTokenDeAcceso = async () => {
  try {
    await AsyncStorage.removeItem('@tokenDeAcceso');
  } catch (error) {
    console.error('Error al eliminar el token de acceso:', error);
  }
};

export const decodificarToken = (token) => {
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

// Ejemplo de cómo obtener y decodificar el token
export const obtenerYDecodificarToken = async () => {
  try {
    const token = await obtenerTokenDeAcceso();
    if (token) {
      const userData = decodificarToken(token);
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener y decodificar el token:', error);
    return null;
  }
};

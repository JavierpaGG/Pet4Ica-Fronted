import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { obtenerTokenDeAcceso, obtenerYDecodificarToken } from '../../Models/token';
import { addComment } from '../../Api/api';

const CreateNewComment = ({ navigation, route }) => {
  const { postId } = route.params;
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del usuario
  const [cuerpo, setCuerpo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = await obtenerTokenDeAcceso(); // Obtener el token sin decodificar
      const userData = await obtenerYDecodificarToken();
      if (userData) {
        setEmail(userData.sub);
        setNombre(userData.nombre);
      } else {
        console.warn('No se obtuvieron datos del usuario.');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleAddComment = async () => {
    if (!email || !nombre || !cuerpo) {
      console.error('Datos insuficientes para enviar el comentario:', { email, nombre, cuerpo });
      return;
    }

    setLoading(true);
    try {
      const token = await obtenerTokenDeAcceso(); // Obtener el token
      const config = {
        headers: { Authorization: `Bearer ${token}` } // Configurar el encabezado de autorización con el token
      };

      await addComment(postId, cuerpo, email, nombre, config); // Agregar la configuración con el token de autorización
      Alert.alert('Comentario agregado con éxito');
      navigation.goBack(); // Volver atrás después de agregar un nuevo comentario
    } catch (error) {
      console.error('Error adding comment:', error);
      console.error('Error response data:', error.response ? error.response.data : 'No response data available');
      setError('Error al agregar el comentario. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Comentario</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe un comentario"
        value={cuerpo}
        onChangeText={text => setCuerpo(text)}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Agregando...' : 'Agregar Comentario'}
          onPress={handleAddComment}
          disabled={loading}
          color="#514286" // Color del texto del botón
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#514286',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default CreateNewComment;

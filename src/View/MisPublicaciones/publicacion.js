import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getImageUrl } from '../../Api/api'; // Importa la función getImageUrl desde tu archivo de configuración de la API
import { obtenerTokenDeAcceso, obtenerYDecodificarToken } from '../../Models/token';
const PostListScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Obtener el ID del usuario
      const userData = await obtenerYDecodificarToken();
      const userId = userData ? userData.id : null;
  
      // Verificar si se pudo obtener el ID del usuario
      if (!userId) {
        setError('Error: No se pudo obtener el ID de usuario');
        setLoading(false);
        return;
      }
  
      // Obtener las publicaciones del usuario usando su ID en la URL
      const response = await axios.get(`http://192.168.1.9:8080/api/usuarios/${userId}/publicaciones`);
      const data = response.data;
  
      if (data && Array.isArray(data)) { // Verificar si data es un array
        setPosts(data.map(item => ({
          ...item,
          source: { uri: getImageUrl(item.mascota.imagenPath) }
        })));
        setLoading(false);
      } else {
        setError('Error: Formato de respuesta incorrecto');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error al cargar las publicaciones:', error);
      setError('Error al cargar las publicaciones. Por favor, inténtelo de nuevo más tarde.');
      setLoading(false);
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleRefresh = () => {
    setLoading(true); // Muestra el indicador de carga
    fetchData(); // Vuelve a cargar los datos
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleRefresh}>
            <Icon name="refresh" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  if (loading) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostComments', { postId: item.id })}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.titulo}</Text>
        <Text style={styles.postDescription}>{item.descripcion}</Text>
        <Image source={item.source} style={styles.postImage} />
        <Text style={styles.postContent}>{item.contenido}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noPostsText}>No hay publicaciones</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#c0b0fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,

  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 14,
    color: '#555',
  },
  noPostsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PostListScreen;

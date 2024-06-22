import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { obtenerTokenDeAcceso } from "../../Models/token";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Button } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import jwtDecode from "jwt-decode";

const CreateNewPost = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [contenido, setContenido] = useState("");
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenCargada, setImagenCargada] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    obtenerToken();
  }, []);

  const obtenerToken = async () => {
    try {
      const token = await obtenerTokenDeAcceso();
      setAccessToken(token);
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id); // Extraer el ID del usuario del token
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }
  };

  const handlePets = async () => {
    const formDataMascota = new FormData();
    formDataMascota.append("nombre", nombre);
    formDataMascota.append("raza", raza);
    formDataMascota.append("edad", edad);
  
    if (imagen) {
      formDataMascota.append("foto", {
        uri: imagen.uri,
        name: imagen.uri.split("/").pop(),
        type: "image/jpeg",
      });
    }
  
    try {
      const responseMascota = await axios.post(
        "http://192.168.1.9:8080/api/mascotas",
        formDataMascota,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
  
      // Extraer el ID del usuario del token
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.id;
  
      const responsePublicacion = await axios.post(
        "http://192.168.1.9:8080/api/publicaciones",
        {
          titulo,
          descripcion,
          contenido,
          mascota: { id: responseMascota.data.id },
          usuario: { id: userId } // Agregar el ID del usuario en la solicitud de publicación
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      
      // Limpiar los datos después de crear la publicación
      clearData();
  
      Alert.alert(
        "Publicación Creada",
        "La publicación se ha creado correctamente"
      );
      navigation.navigate("Main"); // Navegar a la pantalla de lista de publicaciones
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      Alert.alert("Error", "Hubo un error al crear la publicación");
    }
  };
  

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImagen(result.assets[0]);
        setImagenCargada(true);
      } 
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  // Función para limpiar los datos
  const clearData = () => {
    setTitulo("");
    setDescripcion("");
    setContenido("");
    setNombre("");
    setRaza("");
    setEdad("");
    setImagen(null);
    setImagenCargada(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Crear Rellena los datos</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Contenido"
          multiline
          value={contenido} 
          onChangeText={setContenido}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre de la mascota"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Raza"
            value={raza}
            onChangeText={setRaza}
          />
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
          />
          <Button
            title="Seleccionar Imagen"
            onPress={handleImagePicker}
            buttonStyle={styles.imagePickerButton}
            titleStyle={styles.imagePickerButtonText}
          />
          {imagen && <Image source={{ uri: imagen.uri }} style={styles.image} />}
          {imagenCargada && (
            <Text style={styles.successText}>
              ¡La imagen se ha cargado correctamente!
            </Text>
          )}
          <TouchableOpacity style={styles.saveButton} onPress={handlePets}>
            <Text style={styles.saveButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
  export default CreateNewPost;

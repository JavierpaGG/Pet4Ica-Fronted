import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import jwtDecode from "jwt-decode";
import { obtenerTokenDeAcceso } from "../../Models/token";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [dni, setDni] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    obtenerYDecodificarToken();
  }, []);
  
  const obtenerYDecodificarToken = async () => {
    try {
      const token = await obtenerTokenDeAcceso();
      if (token) {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.sub);
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setNombre(parsedUserData.nombre);
          setUsername(parsedUserData.username);
          setDni(parsedUserData.dni);
          setEdad(parsedUserData.edad ? parsedUserData.edad.toString() : '');
          setSexo(parsedUserData.sexo);
          setIsLoading(false);
        } else {
          fetchUserData(decodedToken.id, token);
        }
      }
    } catch (error) {
      console.error("Error al obtener y decodificar el token:", error);
      setIsLoading(false);
    }
  };
  
  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(`http://192.168.1.9:8080/api/usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      setNombre(userData.nombre);
      setUsername(userData.username);
      setDni(userData.dni);
      setEdad(userData.edad ? userData.edad.toString() : '');
      setSexo(userData.sexo);
      setIsLoading(false);
      // Almacenar los datos del usuario localmente
      AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      setIsLoading(false);
    }
  };
  

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = async () => {
    try {
      const token = await obtenerTokenDeAcceso();
      const decodedToken = jwtDecode(token);

      const updatedUser = {
        email: email,
        username: username,
        nombre: nombre || null,
        dni: dni || null,
        edad: edad || null,
        sexo: sexo || null,
      };

      const response = await fetch(
        `http://192.168.1.9:8080/api/usuarios/${decodedToken.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        setIsEditing(false);
      } else {
        console.error("Error al actualizar los datos del usuario");
      }
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{username}</Text>

        <View style={styles.userInfoContainer}>
          <View
            style={[
              styles.userInfoBackground,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Icon
              name="location-on"
              size={18}
              color="#000"
              style={{ marginRight: 5 }}
            />
            <Text style={[styles.text, { fontSize: 16 }]}>Ica, Ica</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Sobre mí</Text>

        <View style={styles.userInfo}>
          <Text style={styles.paragraph}>
            Soy un apasionado amante de los animales, comprometido con su
            bienestar y cuidado. Disfruto dedicar mi tiempo a rescatar, cuidar y
            encontrarles hogares amorosos. ¡Cada mascota merece una vida llena
            de amor!
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Icon name="person" size={24} color="#000" />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
            />
          ) : (
            <Text style={styles.email}>{nombre}</Text>
          )}
        </View>

        <View style={styles.userInfo}>
          <Icon name="badge" size={24} color="#000" />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={dni}
              onChangeText={setDni}
              placeholder="DNI"
            />
          ) : (
            <Text style={styles.email}>{dni}</Text>
          )}
        </View>

        <View style={styles.userInfo}>
          <Icon name="calendar-today" size={24} color="#000" />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={edad}
              onChangeText={(text) => setEdad(text)}
              placeholder="Edad"
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.email}>{edad}</Text>
          )}
        </View>

        <View style={styles.userInfo}>
          <Icon name="wc" size={24} color="#000" />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={sexo}
              onChangeText={setSexo}
              placeholder="Sexo"
            />
          ) : (
            <Text style={styles.email}>{sexo}</Text>
          )}
        </View>

        <View style={styles.userInfo}>
          <Icon name="email" size={24} color="#000" />
          <Text style={styles.email}>{email}</Text>
        </View>

        {isEditing ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#6b61fc" }]}
            onPress={handleSaveButtonClick}
          >
            <Text style={[styles.buttonText, { fontSize: 18 }]}>Guardar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#6b61fc" }]}
            onPress={handleEditButtonClick}
          >
            <Text style={[styles.buttonText, { fontSize: 20 }]}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Profile;

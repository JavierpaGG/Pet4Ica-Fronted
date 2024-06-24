import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import jwtDecode from "jwt-decode";
import { obtenerTokenDeAcceso } from "../../Models/token";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [username, setUsername] = useState("");
  const [dni, setDni] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [nombreOriginal, setNombreOriginal] = useState("");
  const [apellidosOriginal, setApellidosOriginal] = useState("");
  const [dniOriginal, setDniOriginal] = useState("");
  const [edadOriginal, setEdadOriginal] = useState("");
  const [sexoOriginal, setSexoOriginal] = useState("");

  useEffect(() => {
    obtenerYDecodificarToken();
  }, []);
  
  const obtenerYDecodificarToken = async () => {
    try {
      const token = await obtenerTokenDeAcceso();
      if (token) {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.sub);
        fetchUserData(decodedToken.id, token);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  
  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(`http://192.168.1.10:8080/api/usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      setNombre(userData.nombre);
      setNombreOriginal(userData.nombre);
      setApellidos(userData.detalleUsuario.apellidos);
      setApellidosOriginal(userData.detalleUsuario.apellidos);
      setUsername(userData.username);
      setDni(userData.detalleUsuario.dni);
      setDniOriginal(userData.detalleUsuario.dni);
      setEdad(userData.detalleUsuario.edad ? userData.detalleUsuario.edad.toString() : "");
      setEdadOriginal(userData.detalleUsuario.edad ? userData.detalleUsuario.edad.toString() : "");
      setSexo(userData.detalleUsuario.sexo);
      setSexoOriginal(userData.detalleUsuario.sexo);
      setIsLoading(false);
    } catch (error) {
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
        apellidos: apellidos || null,
        detalleUsuario: {
          dni: dni || null,
          edad: edad || null,
          sexo: sexo || null,
        }
      };

      const response = await fetch(
        `http://192.168.1.10:8080/api/usuarios/${decodedToken.id}`,
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
        fetchUserData(decodedToken.id, token); // Refresh user data after update
      } else {
      }
    } catch (error) {
    }
  };

  const handleCancelButtonClick = () => {
    // Revertir los cambios a los valores originales
    setNombre(nombreOriginal);
    setApellidos(apellidosOriginal);
    setDni(dniOriginal);
    setEdad(edadOriginal);
    setSexo(sexoOriginal);
    setIsEditing(false);
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

        <Text style={styles.subtitle}>Mis datos</Text>

        <View style={styles.userInfo}>
          <Icon name="person" size={24} color="#000" />
          <Text style={styles.label}>Nombre:</Text>
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
          <Icon name="person" size={24} color="#000" />
          <Text style={styles.label}>Apellidos:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={apellidos}
              onChangeText={setApellidos}
              placeholder="Apellidos"
            />
          ) : (
            <Text style={styles.email}>{apellidos}</Text>
          )}
        </View>

        <View style={styles.userInfo}>
          <Icon name="badge" size={24} color="#000" />
          <Text style={styles.label}>DNI:</Text>
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
          <Text style={styles.label}>Edad:</Text>
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
          <Text style={styles.label}>Sexo:</Text>
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
          <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#6b61fc" }]}
            onPress={handleSaveButtonClick}
          >
            <Text style={[styles.buttonText, { fontSize: 18 }]}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#6b61fc", marginLeft: 10 }]}
            onPress={handleCancelButtonClick}
          >
            <Text style={[styles.buttonText, { fontSize: 18 }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
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

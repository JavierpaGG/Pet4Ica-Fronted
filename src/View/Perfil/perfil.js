import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import jwtDecode from "jwt-decode";
import { obtenerTokenDeAcceso } from "../../Models/token";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker"; // Importa el Picker

const Profile = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [username, setUsername] = useState("");
  const [dni, setDni] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [sobreMi, setSobreMi] = useState("");

  const [nombreOriginal, setNombreOriginal] = useState("");
  const [apellidosOriginal, setApellidosOriginal] = useState("");
  const [dniOriginal, setDniOriginal] = useState("");
  const [edadOriginal, setEdadOriginal] = useState("");
  const [sexoOriginal, setSexoOriginal] = useState("");
  const [sobreMiOriginal, setSobreMiOriginal] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    obtenerYDecodificarToken();
  }, []);

  const obtenerYDecodificarToken = async () => {
    try {
      const token = await obtenerTokenDeAcceso();
      console.log("Token obtenido:", token);
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log("Token decodificado:", decodedToken);
        setEmail(decodedToken.sub);
        fetchUserData(decodedToken.id, token);
      }
    } catch (error) {
      console.log("Error al obtener y decodificar el token:", error);
      setIsLoading(false);
    }
  };

  const fetchUserData = async (userId, token) => {
    try {
      console.log("Fetching user data for user ID:", userId);
      const response = await fetch(`http://192.168.1.8:8080/api/usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      console.log("User data fetched:", userData);

      if (userData) {
        setNombre(userData.nombre);
        setNombreOriginal(userData.nombre);

        setUsername(userData.username);

        setApellidos(userData.apellidos);
        setApellidosOriginal(userData.apellidos);

        setDni(userData.dni);
        setDniOriginal(userData.dni);

        setEdad(userData.edad.toString()); // Convertir edad a cadena
        setEdadOriginal(userData.edad.toString()); // Convertir edad a cadena

        setSexo(userData.sexo);
        setSexoOriginal(userData.sexo);
        
        setSobreMi(userData.sobremi);
        setSobreMiOriginal(userData.sobremi);
      } else {
        console.log("Datos del usuario no encontrados");
      }

      setIsLoading(false);
    } catch (error) {
      console.log("Error al obtener los datos del usuario:", error);
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
      // console.log("Saving user data with token:", token);

      // Validar que los campos obligatorios no estén vacíos
      if (!nombre || !apellidos || !dni || !edad || !sexo || !sobreMi) {
        console.log("Por favor complete todos los campos obligatorios.");
        return;
      }

      // Verificar restricciones adicionales como la edad mínima
      if (parseInt(edad) < 14) {
        console.log("La edad debe ser al menos 14 años.");
        return;
      }

      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("apellido", apellidos);
      formData.append("dni", dni);
      formData.append("edad", edad);
      formData.append("sexo", sexo);
      formData.append("sobremi", sobreMi);

      console.log("FormData to be sent:", formData);

      const responseactualizar = await fetch(
        `http://192.168.1.8:8080/api/usuarios/${decodedToken.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
          redirect: "follow"
        }
      );

      if (responseactualizar.ok) {
        console.log("User data updated successfully.");
        setIsEditing(false);
        fetchUserData(decodedToken.id, token); // Actualizar datos del usuario después de guardar
      } else {
        setIsEditing(false);
        console.log("Failed to update user data. Response:", responseactualizar);
      }
    } catch (error) {
      console.log("Error al guardar los datos del usuario:", error);
    }
  };

  const handleCancelButtonClick = () => {
    setNombre(nombreOriginal);
    setApellidos(apellidosOriginal);
    setDni(dniOriginal);
    setEdad(edadOriginal);
    setSexo(sexoOriginal);
    setSobreMi(sobreMiOriginal);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{username}</Text>
        <Text style={styles.subtitle}>Mis datos</Text>

        <View style={[styles.userInfoContainer, styles.userInfo]}>
          <Icon name="person" size={24} color="#6b61fc" />
          <Text style={styles.label}>Nombre:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
              maxLength={75} // Aproximadamente 15 palabras
            />
          ) : (
            <Text style={styles.email}>{nombre}</Text>
          )}
        </View>

        <View style={[styles.userInfoContainer, styles.userInfo]}>
          <Icon name="person" size={24} color="#6b61fc" />
          <Text style={styles.label}>Apellidos:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={apellidos}
              onChangeText={setApellidos}
              placeholder="Apellidos"
              maxLength={75} // Aproximadamente 15 palabras
            />
          ) : (
            <Text style={styles.email}>{apellidos}</Text>
          )}
        </View>

        <View style={[styles.userInfoContainer, styles.userInfo]}>
          <Icon name="badge" size={24} color="#6b61fc" />
          <Text style={styles.label}>DNI:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={dni}
              onChangeText={setDni}
              placeholder="DNI"
              keyboardType="numeric"
              maxLength={8}
            />
          ) : (
            <Text style={styles.email}>{dni}</Text>
          )}
        </View>

        <View style={[styles.userInfoContainer, styles.userInfo]}>
          <Icon name="calendar-today" size={24} color="#6b61fc" />
          <Text style={styles.label}>Edad:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={edad}
              onChangeText={setEdad}
              placeholder="Edad"
              keyboardType="numeric"
              maxLength={2}
            />
          ) : (
            <Text style={styles.email}>{edad}</Text>
          )}
        </View>

        <View style={[styles.userInfoContainer, styles.userInfo]}>
          <Icon name="wc" size={24} color="#6b61fc" />
          <Text style={styles.label}>Sexo:</Text>
          {isEditing ? (
            <Picker
              selectedValue={sexo}
              onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
              <Picker.Item label="No binario" value="No binario" />
            </Picker>
          ) : (
            <Text style={styles.email}>{sexo}</Text>
          )}
        </View>

        <View style={[styles.userInfoContainer, styles.userInfo, { minHeight: 120 }]}>
          <Icon name="info" size={24} color="#6b61fc" />
          <Text style={styles.label}>Sobre mí:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={sobreMi}
              onChangeText={setSobreMi}
              placeholder="Cuéntanos un poco sobre ti..."
              multiline
              maxLength={600} // Aproximadamente 60 palabras
            />
          ) : (
            <Text style={styles.email}>{sobreMi}</Text>
          )}
        </View>

        {isEditing ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSaveButtonClick}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelButtonClick}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleEditButtonClick}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;

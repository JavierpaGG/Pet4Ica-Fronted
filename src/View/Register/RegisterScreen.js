import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createData } from '../../Api/api';
import { styles } from './styles';
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      // Validación de campos
      if (username.length < 4) {
        throw new Error('Nombre de usuario debe tener al menos 4 caracteres.');
      }
      if (nombre.length < 4) {
        throw new Error('Nombre debe tener al menos 4 caracteres.');
      }
      if (!email || !email.includes('@')) {
        throw new Error('Correo electrónico no válido.');
      }
      if (password.length < 8) {
        throw new Error('Contraseña debe tener al menos 8 caracteres.');
      }

      const data = { username, nombre, email, password };
      const response = await createData('auth/registrar', data);

      // Verifica la respuesta
      if (typeof response === 'string') {
        // Si la respuesta es un string, significa que el registro fue exitoso
        navigation.navigate("Login");
        showAlert('Registro exitoso', 'Usuario registrado correctamente');
      } else {
        // Si la respuesta no es un string, muestra el mensaje de error recibido
        setErrorMessage(response.data.message || 'Error en el registro');
      }
    } catch (error) {
      // Captura y muestra errores específicos
      showAlert('Error', error.message);
    }
  };

  const showAlert = (title, message) => {
    // Mostrar alerta con título y mensaje personalizados
    Alert.alert(title, message);
  };

  return (
    <LinearGradient
      colors={['#514287', '#e5e6fa', '#e5e6fa', '#e5e6fa']} // Colores del gradiente lineal
      style={styles.container}
    >
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo@gmail.com"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: '#8379ff'
        }}
        onPress={handleRegister}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: '#f1f1f1'
          }}
        >
          Registrar
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default RegisterScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createData } from '../../Api/api';
import { guardarTokenDeAcceso, obtenerTokenDeAcceso } from '../../Models/token'; // Cambiado el nombre de la función
import {styles} from './styles'

const LoginScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [logoVisible, setLogoVisible] = useState(true); // Estado para controlar la visibilidad del logo

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const token = await obtenerTokenDeAcceso();
    if (token) {
      navigation.navigate("Main");
    }
  };

  const handleLogin = async () => {
    try {
      const data = { usernameOrEmail, password };
      const response = await createData('auth/iniciarSesion', data);
        
      if (response && response.tokenDeAcceso) {
        guardarTokenDeAcceso(response.tokenDeAcceso); // Guardar el nuevo token de acceso
        Alert.alert("Inicio de sesión exitoso", "¡Bienvenido!");
        navigation.navigate("Main");
      } else {
        setErrorMessage("No se pudo iniciar sesión. Por favor, verifica tus credenciales.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };

  const handleFocusTextInput = () => {
    setLogoVisible(false);
  };

  const handleBlurTextInput = () => {
    setLogoVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient colors={['#514287', '#6a61fc', '#b09dee', '#f1f1f1']} style={styles.rectangle}>
          {logoVisible && (
            <View style={styles.logoContainer}>
              <Image source={require('../../../assets/Logo-Pet4Ica.jpeg')} style={styles.logo} />
            </View>
          )}
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>¡Bienvenido!</Text>
        <Text style={styles.subTitle}>Inicia sesión con tu cuenta</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="correo@gmail.com"
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          onFocus={handleFocusTextInput}
          onBlur={handleBlurTextInput}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          onFocus={handleFocusTextInput}
          onBlur={handleBlurTextInput}
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        {buttonLogin({ onPress: handleLogin, text: "Iniciar Sesión", navigation })}
        {buttonRegisterInicial({ onPress: () => navigation.navigate("Register"), text: "¿No tienes una cuenta?", navigation })}
      </View>
    </View>
  );
};

export function buttonLogin(props) {
  const { onPress, text } = props;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: '#8379ff'
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.buttonText,
          color: '#f1f1f1'
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export function buttonRegisterInicial(props) {
  const { onPress, text } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          ...styles.buttonText,
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default LoginScreen;
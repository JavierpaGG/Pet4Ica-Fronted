import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createData } from '../../Api/api';
import { guardarTokenDeAcceso } from '../../Models/token'; // Cambiado el nombre de la función
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [logoVisible, setLogoVisible] = useState(true); // Estado para controlar la visibilidad del logo

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

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            onFocus={handleFocusTextInput}
            onBlur={handleBlurTextInput}
          />
          <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.iconContainer}>
            <Icon
              name={secureTextEntry ? "visibility-off" : "visibility"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>
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

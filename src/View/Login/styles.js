import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f1f1',
    },
    header: {
      height: 300, // Altura del encabezado
    },
    rectangle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      left: 0,
      right: 0,
      top: '10%',
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom: 20,
      borderRadius: 100,
      opacity: 0.95,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -240, 
    },
    titulo: {
      fontSize: 60,
      color: '#000',
      fontWeight: 'bold',
    },
    subTitle: {
      fontSize: 20,
      color: '#6b61fb',
    },
    TextInput: {
      padding: 10,
      paddingStart: 20,
      width: '80%',
      height: 50,
      marginTop: 10,
      borderRadius: 30,
      backgroundColor: '#fff'
    },
    button: {
      alignSelf: 'center',
      borderRadius: 10,
      paddingVertical: 15,
      width: '90%',
      marginTop: 10,
    },
    buttonText: {
      textAlign: 'center',
    },
    error: {
      color: 'red',
      marginTop: 10,
    }
  });
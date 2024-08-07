import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  header: {
    height: 350, // Altura del encabezado
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
    fontSize: 35,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    color: '#6b61fb',
    marginBottom: 20,
  },
  TextInput: {
    padding: 10,
    paddingStart: 20,
    width: '70%',
    height: 50,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 2, // Añadir sombra para Android
    shadowColor: '#000', // Añadir sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    height: 60,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 2, // Añadir sombra para Android
    shadowColor: '#000', // Añadir sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    width: '40%',
    marginTop: 20,
    backgroundColor: '#8379ff',
  },
  buttonText: {
    textAlign: 'center',
    color: '#f1f1f1',
    fontWeight: 'bold',
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  iconContainer: {
    padding: 10,
  },
});
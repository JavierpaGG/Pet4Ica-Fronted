import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15, // Aumenté el radio del borde
    borderWidth: 2, // Añadí un borde con un ancho de 2
    borderColor: '#ccc', // Color del borde
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfoBackground: {
    backgroundColor: '#c9c7ff',
    borderRadius: 8, // Redondeé un poco más los bordes
    padding: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    marginLeft: 10,
    flex: 1,
  },
  button: {
    backgroundColor: '#6b61fc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25, // Aumenté el radio del borde
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

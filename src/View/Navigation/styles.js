import { StyleSheet } from 'react-native';

export const drawerStyles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center', // Centra los elementos horizontalmente
    justifyContent: 'center', // Centra los elementos verticalmente
    marginBottom: 10,
  },
  drawerHeaderImage: {
    width: 250,
    height: 140,
    borderRadius: 70,
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerHeaderOptions: {
    headerStyle: {
      backgroundColor: '#6960fc', // Color de fondo de la barra superior
    },
    headerTintColor: '#fff', // Color del texto en la barra superior
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

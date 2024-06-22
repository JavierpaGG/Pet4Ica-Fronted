import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const FavoritePetsScreen = () => {
  // Datos de ejemplo de mascotas favoritas
  const favoritePetsData = [
    {
      id: '1',
      name: 'Luna',
      breed: 'Labrador Retriever',
      image: require('../../../assets/pet1.jpg'),
    },
    {
      id: '2',
      name: 'Max',
      breed: 'Golden Retriever',
      image: require('../../../assets/pet2.jpg'),
    },
    // Agrega más mascotas favoritas aquí si lo deseas
  ];

  // Renderiza cada elemento de la lista de mascotas favoritas
  const renderFavoritePetItem = ({ item }) => (
    <TouchableOpacity style={styles.petItemContainer}>
      <Image source={item.image} style={styles.petImage} />
      <Text style={styles.petName}>{item.name}</Text>
      <Text style={styles.petBreed}>{item.breed}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>❤️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritePetsData}
        renderItem={renderFavoritePetItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Muestra los elementos en dos columnas
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  petItemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  petBreed: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#514386',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoritePetsScreen;

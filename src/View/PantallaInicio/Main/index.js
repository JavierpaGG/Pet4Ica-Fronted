import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Animated, PanResponder, Text, View, Alert } from "react-native";
import { usePets } from "../data/dataperros";
import Card from "../Card";
import { styles } from "./styles";
import { ACTION_OFFSET, CARD } from "../utils/constants";
import Footer from "../Footer";
import CommentsModal from "../Modal/comentarios";

export default function Main() {
  const { pets, setPets, loading, error } = usePets();
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(renoveTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const renoveTopCard = useCallback(() => {
    if (pets.length === 1) {
      Alert.alert(
        'Todas las publicaciones mostradas',
        'Por el momento no hay más publicaciones disponibles',
        [{ text: 'OK', onPress: () => console.log('OK presionado') }]
      );
    }
    setPets((prevState) => prevState.slice(1));
    setCurrentPostId(null);
    swipe.setValue({ x: 0, y: 0 });
  }, [pets.length, setPets, swipe]);

  const handleChoice = useCallback((direction) => {
    if (pets.length > 0) {
      const postId = pets[0].id;
      setCurrentPostId(postId);  // Asegúrate de configurar el postId aquí
      if (direction === 0) {
        setModalVisible(true);
      } else {
        Animated.timing(swipe.x, {
          toValue: direction * CARD.OUT_OF_SCREEN,
          duration: 400,
          useNativeDriver: true,
        }).start(renoveTopCard);
      }
    }
  }, [renoveTopCard, pets, swipe.x]);
  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    console.error('Error:', error);
    return (
      <View style={styles.container}>
        <Text>Error al obtener los datos: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {pets
        .map(({ id, name, source }, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <Card
              key={id}
              name={name}
              source={source}
              isFirst={isFirst}
              swipe={swipe}
              tiltSign={tiltSign}
              postId={id}
              {...dragHandlers}
            />
          );
        })
        .reverse()}
      <Footer handleChoice={handleChoice} />
      <CommentsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        postId={currentPostId}
      />
    </View>
  );
}

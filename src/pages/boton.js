import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const Boton = () => {
  const backgroundColorRef = new Animated.Value(0); //<-- Animación

  const handlePress = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true,
    }).start();
  };

  const handleRelease = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 0,
      duration: 60,
      useNativeDriver: true,
    }).start();
  };

  //Interpolacion de colores
  const backgroundColor = backgroundColorRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["#EAB68F", "#D98E73"],
  });

  // Applying the interpolated backgroundColor
  return (
    <Pressable onPressIn={handlePress} onPressOut={handleRelease}>
      <Animated.View style={[styles.buttonContainer, { backgroundColor }]}>
        <Text style={styles.buttonText}>Press me</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#EAB68F",
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 15,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});

export default Boton;

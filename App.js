import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainComponent from "./src/pages/mainComponent";
import PantallaLlave from "./src/pages/pantallaLlave";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* CAMBIAR ORDEN */}
          <Stack.Screen name="Selector" component={MainComponent} />
          <Stack.Screen name="Botones" component={PantallaLlave} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

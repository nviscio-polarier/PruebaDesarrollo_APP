Main App

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

App1

import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Ir a Detalles"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
}

App2
import React from 'react';
import { View, Text } from 'react-native';

export default function DetailScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pantalla de Detalles</Text>
    </View>
  );
}

————-


const getLavanderia = () => {
  const select = document.getElementById("lavanderias");
  const id = select.value;
  const label = select.options[select.selectedIndex].text;
  console.log("ID:", id, "Label:", label);
};

const getPersona = () => {
  const select = document.getElementById("personas");
  const id = select.value;
  const label = select.options[select.selectedIndex].text;
  console.log("ID:", id, "Label:", label);
};

const getVehiculo = () => {
  const select = document.getElementById("vehiculos");
  const id = select.value;
  const label = select.options[select.selectedIndex].text;
  console.log("ID:", id, "Label:", label);
};

—-

<select id="lavanderias" onChange={getLavanderia}>
  {lavanderias.map((l) => (
    <option key={l.idLavanderia} value={l.idLavanderia}>{l.denominacion}</option>
  ))}
</select>

<select id="personas" onChange={getPersona}>
  {personas.map((p) => (
    <option key={p.idPersona} value={p.idPersona}>{p.nombre}</option>
  ))}
</select>

<select id="vehiculos" onChange={getVehiculo}>
  {vehiculos.map((v) => (
    <option key={v.idVehiculo} value={v.idVehiculo}>{v.matricula}</option>
  ))}
</select>

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const TaquillasDropdown = () => {
  const [dropdownData, setDropdownData] = useState([]);

  // Datos simulados
  const taquillaLavanderia = [
    { idTaquilla: 14, denominacion: 'Lavandería A', tamano: 14 }
  ];

  const estadoTaquilla = [
    { idTaquilla: 14, posicion: 4, disponible: 0 },
    { idTaquilla: 14, posicion: 3, disponible: 1 },
    { idTaquilla: 14, posicion: 1, disponible: 0 },
    { idTaquilla: 14, posicion: 1, disponible: 1 },
    { idTaquilla: 14, posicion: 4, disponible: 1 }
  ];

  useEffect(() => {
    const taquilla = taquillaLavanderia[0]; // trabajar con la primera
    const { idTaquilla, tamano } = taquilla;

    // Agrupar últimos estados por posición
    const ultimosEstados = {};
    estadoTaquilla.forEach((estado) => {
      if (estado.idTaquilla === idTaquilla) {
        // sobrescribe el anterior → se queda con el último
        ultimosEstados[estado.posicion] = estado;
      }
    });

    // Generar las opciones de 1 a tamano
    const opciones = [];
    for (let i = 1; i <= tamano; i++) {
      const estado = ultimosEstados[i];
      // Si no hay estado, o el último indica disponible, se incluye
      if (!estado || estado.disponible === 1) {
        opciones.push({
          label: `Posición ${i}`,
          value: i
        });
      }
    }

    setDropdownData(opciones);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Dropdown
        style={{ height: 50, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
        data={dropdownData}
        labelField="label"
        valueField="value"
        placeholder="Selecciona una posición"
        onChange={item => console.log('Seleccionado:', item)}
      />
    </View>
  );
};

export default TaquillasDropdown;



—--------------------


import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const TaquillasStatusBox = () => {
  const [ocupadas, setOcupadas] = useState(0);
  const [tamano, setTamano] = useState(0);

  // Simulación de datos
  const taquillaLavanderia = [
    { idTaquilla: 14, denominacion: 'Lavandería A', tamano: 14 }
  ];

  const estadoTaquilla = [
    { idTaquilla: 14, posicion: 4, disponible: 0 },
    { idTaquilla: 14, posicion: 3, disponible: 1 },
    { idTaquilla: 14, posicion: 1, disponible: 0 },
    { idTaquilla: 14, posicion: 1, disponible: 1 },
    { idTaquilla: 14, posicion: 4, disponible: 1 }
  ];

  useEffect(() => {
    const taquilla = taquillaLavanderia[0];
    const { idTaquilla, tamano } = taquilla;
    setTamano(tamano);

    // Filtrar últimos estados por posición
    const ultimosEstados = {};
    estadoTaquilla.forEach((estado) => {
      if (estado.idTaquilla === idTaquilla) {
        ultimosEstados[estado.posicion] = estado; // sobrescribe
      }
    });

    // Contar cuántos tienen disponible === 0
    let count = 0;
    for (let i = 1; i <= tamano; i++) {
      const estado = ultimosEstados[i];
      if (estado && estado.disponible === 0) {
        count++;
      }
    }

    setOcupadas(count);
  }, []);

  return (
    <View style={{
      margin: 20,
      padding: 20,
      backgroundColor: '#f2f2f2',
      borderRadius: 10,
      alignItems: 'center'
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Ocupadas: {ocupadas}/{tamano}
      </Text>
    </View>
  );
};

export default TaquillasStatusBox;

———


import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MiBoton = ({ deshabilitado }) => {
  return (
    <TouchableOpacity
      disabled={deshabilitado}
      style={[styles.boton, deshabilitado && styles.botonDeshabilitado]}
      onPress={() => {
        console.log("¡Botón presionado!");
      }}
    >
      <Text style={styles.texto}>Presióname</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  botonDeshabilitado: {
    backgroundColor: '#cccccc',
  },
  texto: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MiBoton;

import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-web";
import { colors } from "../../styles/base";
import { Dropdown } from "react-native-element-dropdown";

export default function MainComponent({ navigation }) {
  const [lavanderias, setLavanderias] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [lavanderiaSelccionada, setLavanderiaSelccionada] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState([]);
  const [cargando, setCargando] = useState(true); //<-- En casos de poner donut de carga

  //DataSource lavanderias (EXTERNALIZARLAS EN UTILS)
  useEffect(() => {
    const dataSourceGetLavanderias = async () => {
      try {
        const response = await fetch(
          `https://localhost:7136/odata/getLavanderias`
        );
        const data = await response.json();
        setLavanderias(data);
        console.log("Lavanderias recibidas:", data);
      } catch (error) {
        console.log("ERROR API LAVANDERIAS");
        return;
      } finally {
        setCargando(false);
      }
    };
    dataSourceGetLavanderias();
  }, []);

  //DataSource Personas de lavanderia seleccionada
  const dataSourceGetPersonasLavanderia = async () => {
    try {
      const response = await fetch(
        `https://localhost:7136/odata/getPersonasLavanderia?idLavanderia=${lavanderiaSelccionada}`
      );
      const data = await response.json();
      setPersonas(data);
      console.log("Data Personas:", data);
    } catch (error) {
      console.log("ERROR API PERSONAS");
    } finally {
      setCargando(false);
    }
  };

  //DataSource Vehiculos de lavanderia seleccionada
  const dataSourceGetVehiculoLavanderia = async () => {
    try {
      const response = await fetch(
        `https://localhost:7136/odata/getVehiculoLavanderia?idLavanderia=${lavanderiaSelccionada}`
      );
      const data = await response.json();
      setVehiculos(data);
      console.log("Data Vehiculos:", data);
    } catch (error) {
      console.log("ERROR API PERSONAS");
    } finally {
      setCargando(false);
    }
  };

  //UseEffect para actualizar la informacion recivida

  useEffect(() => {
    dataSourceGetPersonasLavanderia();
    dataSourceGetVehiculoLavanderia();
  }, [lavanderiaSelccionada]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>Lavandería</Text>
        <Dropdown
          style={styles.dropdown}
          data={lavanderias}
          search
          valueField="idLavanderia"
          labelField="denominacion"
          placeholder="Selecciona una lavandería"
          searchPlaceholder="Buscar..."
          value={lavanderiaSelccionada}
          onChange={(item) => {
            setLavanderiaSelccionada(item.idLavanderia);
            console.log("Lavandería seleccionada:", item.idLavanderia);
          }}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Persona</Text>
        <Dropdown
          style={styles.dropdown}
          data={personas}
          search
          valueField="idPersona"
          labelField="nombre"
          placeholder="Selecciona una persona"
          searchPlaceholder="Buscar..."
          value={personaSeleccionada}
          onChange={(item) => {
            setPersonaSeleccionada(item.idPersona);
            console.log("Persona seleccionada:", item.idPersona);
          }}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Vehículo</Text>
        <Dropdown
          style={styles.dropdown}
          data={vehiculos}
          search
          valueField="idVehiculo"
          labelField="matricula"
          placeholder="Selecciona un vehículo"
          searchPlaceholder="Buscar..."
          value={vehiculoSeleccionado}
          onChange={(item) => {
            setVehiculoSeleccionado(item.idVehiculo);
            console.log("Vehículo seleccionado:", item.idVehiculo);
          }}
        />
      </View>
      <Button
        title="Siguiente"
        onPress={() => {
          navigation.navigate("Botones", {
            idLavanderia: lavanderiaSelccionada,
            idPersona: personaSeleccionada,
            idVehiculo: vehiculoSeleccionado,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainComponent: {
    justifyContent: "center",
    marginLeft: "21%",
    marginTop: "10%",
    width: "200px",
    color: colors.lightBlack,
  },
  options: {
    marginBottom: "10px",
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

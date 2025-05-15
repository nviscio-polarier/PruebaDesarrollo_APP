import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { colors } from "../../styles/base";
import { Dropdown } from "react-native-element-dropdown";
import logo from "./fotos/logo.png";

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
    <View style={styles.mainComponent}>
      <View>
        <Image source={logo} resizeMode="cover" style={styles.imagen} />
      </View>
      <View style={styles.contenedorSelectores}>
        <View style={styles.contenedorDropdown}>
          <Text style={styles.labelContenedor}>Lavandería</Text>
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

        <View style={styles.contenedorDropdown}>
          <Text style={styles.labelContenedor}>Persona</Text>
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

        <View style={styles.contenedorDropdown}>
          <Text style={styles.labelContenedor}>Vehículo</Text>
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
        <TouchableOpacity
          style={styles.boton}
          onPress={() => {
            navigation.navigate("Botones", {
              idLavanderia: lavanderiaSelccionada,
              idPersona: personaSeleccionada,
              idVehiculo: vehiculoSeleccionado,
            });
          }}
        >
          <Text style={styles.botonText}>SIGUIENTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainComponent: {
    backgroundColor: "white",
    height: "100%",
  },
  contenedorSelectores: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "10%",
    color: colors.lightBlack,
    width: "320px",
    backgroundColor: "white",
  },
  imagen: {
    width: "95%",
    alignSelf: "center",
    height: 125,
    marginTop: 20,
  },
  contenedorDropdown: {
    padding: 16,
    backgroundColor: "white",
  },
  labelContenedor: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropdown: {
    height: 50,
    borderColor: "#EDB637",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  boton: {
    marginTop: 15,
    backgroundColor: "#EDB637",
    width: 180,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  botonText: {
    color: "white",
    fontWeight: "bold",
  },
});

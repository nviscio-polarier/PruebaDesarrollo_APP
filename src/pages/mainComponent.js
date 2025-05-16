import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import logo from "./fotos/logo.png";
import { PantallaLogin } from "./styles";

export default function MainComponent({ navigation }) {
  //Hooks
  const [lavanderias, setLavanderias] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [lavanderiaSelccionada, setLavanderiaSelccionada] = useState([]);
  const [lavanderiaSeleccionadaLabel, setLavanderiaSeleccionadaLabel] =
    useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState([]);
  const [personaSeleccionadaLabel, setPersonaSeleccionadaLabel] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState([]);
  const [vehiculoSeleccionadoLabel, setVehiculoSeleccionadoLabel] = useState(
    []
  );

  const [cargando, setCargando] = useState(true); //<-- En casos de poner donut de carga

  const deshabilitado =
    lavanderiaSelccionada.length <= 0 ||
    vehiculoSeleccionado.length <= 0 ||
    personaSeleccionada.length <= 0;

  //DATASOURCES ( EXTERNALIZAR ) ----------------------------------------------------------------------------

  //DataSource lavanderias
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

  //DATASOURCES ( EXTERNALIZAR ) ----------------------------------------------------------------------------

  //Render
  return (
    <View style={PantallaLogin.mainComponent}>
      <View>
        <Image source={logo} resizeMode="cover" style={PantallaLogin.imagen} />
      </View>
      <View style={PantallaLogin.contenedorSelectores}>
        <View style={PantallaLogin.contenedorDropdown}>
          <Text style={PantallaLogin.labelContenedor}>Lavandería</Text>
          <Dropdown
            style={PantallaLogin.dropdown}
            data={lavanderias}
            search
            valueField="idLavanderia"
            labelField="denominacion"
            placeholder="Selecciona una lavandería"
            searchPlaceholder="Buscar..."
            value={lavanderiaSelccionada}
            onChange={(item) => {
              setLavanderiaSelccionada(item.idLavanderia);
              setLavanderiaSeleccionadaLabel(item.denominacion);
              console.log(
                "Lavandería seleccionada:",
                item.denominacion,
                item.idLavanderia
              );
            }}
          />
        </View>

        <View style={PantallaLogin.contenedorDropdown}>
          <Text style={PantallaLogin.labelContenedor}>Persona</Text>
          <Dropdown
            disable={lavanderiaSelccionada.length <= 0}
            style={[
              PantallaLogin.dropdown,
              lavanderiaSelccionada.length <= 0 &&
                PantallaLogin.dropdownDisabled,
            ]}
            data={personas}
            search
            valueField="idPersona"
            labelField="nombre"
            placeholder="Selecciona una persona"
            searchPlaceholder="Buscar..."
            value={personaSeleccionada}
            onChange={(item) => {
              setPersonaSeleccionada(item.idPersona);
              setPersonaSeleccionadaLabel(item.nombre);
              console.log("Persona seleccionada:", item.nombre, item.idPersona);
            }}
          />
        </View>

        <View style={PantallaLogin.contenedorDropdown}>
          <Text style={PantallaLogin.labelContenedor}>Vehículo</Text>
          <Dropdown
            disable={lavanderiaSelccionada.length <= 0}
            style={[
              PantallaLogin.dropdown,
              lavanderiaSelccionada.length <= 0 &&
                PantallaLogin.dropdownDisabled,
            ]}
            data={vehiculos}
            search
            valueField="idVehiculo"
            labelField="denominacion"
            placeholder="Selecciona un vehículo"
            searchPlaceholder="Buscar..."
            value={vehiculoSeleccionado}
            onChange={(item) => {
              setVehiculoSeleccionado(item.idVehiculo);
              setVehiculoSeleccionadoLabel(item.denominacion);
              console.log(
                "Vehículo seleccionado:",
                item.idVehiculo,
                item.denominacion
              );
            }}
          />
        </View>
        <TouchableOpacity
          disabled={deshabilitado}
          style={[
            PantallaLogin.boton,
            deshabilitado && PantallaLogin.botonDisabled,
          ]}
          onPress={() => {
            navigation.navigate("Botones", {
              idLavanderia: lavanderiaSelccionada,
              labelLavanderia: lavanderiaSeleccionadaLabel,
              idPersona: personaSeleccionada,
              labelPersona: personaSeleccionadaLabel,
              idVehiculo: vehiculoSeleccionado,
              lavelVehiculo: vehiculoSeleccionadoLabel,
            });
          }}
        >
          <Text style={PantallaLogin.botonText}>SIGUIENTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

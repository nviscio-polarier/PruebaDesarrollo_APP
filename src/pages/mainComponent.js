import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-web";
import { colors } from "../../styles/base";
import { Dropdown } from "react-native-element-dropdown";

export default function MainComponent({ navigation }) {
  const [lavanderias, setLavanderias] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [lavanderiaSelccionada, setLavanderiaSelccionada] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState([]);
  const [value, setValue] = useState(null);

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

  const dataSourceGetPersonasLavanderia = async () => {
    try {
      const response = await fetch(
        `https://localhost:7136/odata/getPersonasLavanderia?idLavanderia=${lavanderiaSelccionada}`
      );
      const data = await response.json();
      setPersonas(data);
      console.log("DATAAAAA:", data);
    } catch (error) {
      console.log("ERROR API PERSONAS");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    dataSourceGetPersonasLavanderia();
  }, [lavanderiaSelccionada]);

  useEffect(() => {
    const dataSourceGetVehiculos = async (lavanderiaSelccionada) => {
      try {
        const response = await fetch(
          `https://localhost:7136/odata/getVehiculoLavanderia?idLavanderia=${lavanderiaSelccionada}`
        );
        const data = await response.json();

        if (!data || data.lenght == 0) {
          console.log("Array de vehiculos vacio:");
        } else {
          setVehiculos(data);
          console.log("Vehiculos recibidos:", data);
        }
      } catch (error) {
        console.log("ERROR API VEHICULOS");
        return;
      } finally {
        setCargando(false);
      }
    };
    dataSourceGetVehiculos();
  }, []);

  //Recoge la información de las options seleccionadas

  const getLavanderia = () => {
    const selectLavanderia = document.getElementById("lavanderias");
    const id = selectLavanderia.value;
    setLavanderiaSelccionada(id);
    console.log(id);
  };

  const getPersona = () => {
    const selectPersona = document.getElementById("personas");
    const id = selectPersona.value;
    setPersonaSeleccionada(id);
    console.log(id);
  };

  const getVehiculo = () => {
    const selectVehiculo = document.getElementById("vehiculos");
    const id = selectVehiculo.value;
    setVehiculoSeleccionado(id);
    console.log(id);
  };

  return (
    <View style={styles.mainComponent}>
      <View>
        <select
          id="lavanderias"
          onChange={getLavanderia}
          style={styles.options}
        >
          {lavanderias.map((l) => (
            <option key={l.idLavanderia} value={l.idLavanderia}>
              {l.denominacion}
            </option>
          ))}
        </select>
      </View>
      <View>
        <select id="personas" onChange={getPersona} style={styles.options}>
          {personas.map((p) => (
            <option key={p.idPersona} value={p.idPersona}>
              {p.nombre}
            </option>
          ))}
        </select>
      </View>
      <View>
        <select id="vehiculos" onChange={getVehiculo} style={styles.options}>
          {vehiculos.map((v) => (
            <option key={v.idVehiculo} value={v.idVehiculo}>
              {v.matricula}
            </option>
          ))}
        </select>
      </View>
      {/* <View>
        <Dropdown
          data={lavanderias}
          labelField="denominacion"
          valueField="idLavanderia"
          placeholder="Selecciona lavanderia"
          value={value}
          onChange={(item) => {
            setLavanderiaSelccionada(item.value);
          }}
        />
      </View> */}
      <Button
        title="Siguiente"
        onPress={() => navigation.navigate("Botones")}
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
});

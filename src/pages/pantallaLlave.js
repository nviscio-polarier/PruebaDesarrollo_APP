import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import icono from "./fotos/icono.png";
import { PantallaRecogida } from "./styles";

export default function PantallaLlave({ route }) {
  //Hooks
  const [dejar, setDejar] = useState(false);
  const [estado, setEstado] = useState(false);
  const [posicionSeleccionada, setPosicionSeleccionada] = useState([]);
  const [taquillaLavanderia, setTaquillaLavanderia] = useState([]); //<-- Sin funcionalidad, datos de taquilla recogido falta filtro por taquilla
  const [recoger, setRecoger] = useState(false); //<-- Gestiona el estado de los botones y dropdown
  const date = new Date(); //<-- Recoge la fecha actual

  //Mockup
  const taquilla = 13;

  const datosDropdown = [
    { posicion: "1", value: 1 },
    { posicion: "2", value: 2 },
    { posicion: "3", value: 3 },
    { posicion: "4", value: 4 },
    { posicion: "5", value: 5 },
    { posicion: "6", value: 6 },
    { posicion: "7", value: 7 },
    { posicion: "8", value: 8 },
    { posicion: "9", value: 9 },
    { posicion: "10", value: 10 },
    { posicion: "11", value: 11 },
    { posicion: "12", value: 12 },
    { posicion: "13", value: 13 },
    { posicion: "14", value: 14 },
  ];

  //Guarrada a cambiar
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  //Parametros que llegan de la otra pantalla
  const { idLavanderia } = route.params;
  const { labelLavanderia } = route.params;
  const { idPersona } = route.params;
  const { labelPersona } = route.params;
  const { idVehiculo } = route.params;
  const { lavelVehiculo } = route.params;

  //DATASOURCES ( EXTERNALIZAR ) ----------------------------------------------------------------------------

  //Recoge las taquillas asignadas a la lavanderia seleccionada.
  useEffect(() => {
    const dataSourceGetTaquillasLavanderia = async () => {
      try {
        const response = await fetch(
          `https://localhost:7136/odata/getTaquillasLavanderia?idLavanderia=${idLavanderia}`
        );
        const data = await response.json();
        setTaquillaLavanderia(data);
        console.log("Data taquillas:", data);
      } catch (error) {
        console.log("ERROR API TAQUILLAS");
      }
    };
    dataSourceGetTaquillasLavanderia();
  }, []);

  //Crea registro de recogida de llave
  const postMovimientoRecogida = async () => {
    const fechaFormateada = formatDate(date);

    try {
      const response = await fetch(
        `https://localhost:7136/odata/postMovimientoTaquilla`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idTaquilla: taquilla, //<-- Cambiar por dato real, actual mockup
            idVehiculo: idVehiculo,
            idPersona: idPersona,
            fechaRecogida: fechaFormateada,
            fechaDejar: null,
            posicion: posicionSeleccionada,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear movimiento de recogida");
      }
      setEstado(true);
      postEstadoTaquilla();
      console.log("Movimiento recogida creado correctamente");
    } catch (error) {
      console.error("Error al crear movimiento de recogida:", error);
    }
  };

  //Crea registro de recogida de llave ( EXTERNALIZAR )
  const postMovimientoDejar = async () => {
    const fechaFormateada = formatDate(date);

    try {
      const response = await fetch(
        `https://localhost:7136/odata/postMovimientoTaquilla`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idTaquilla: taquilla, //<-- Cambiar por dato real, actual mockup
            idVehiculo: idVehiculo,
            idPersona: idPersona,
            fechaRecogida: null,
            fechaDejar: fechaFormateada,
            posicion: posicionSeleccionada,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear movimiento de dejar");
      }
      setEstado(false);
      postEstadoTaquilla();
      console.log("Movimiento dejar creado correctamente");
    } catch (error) {
      console.error("Error al crear movimiento de dejar:", error);
    }
  };

  //Actualiza el estado de la posicion de la taquilla seleccionada
  const postEstadoTaquilla = async () => {
    try {
      const response = await fetch(
        `https://localhost:7136/odata/postEstadoTaquilla`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idTaquilla: 13,
            posicion: posicionSeleccionada,
            disponible: estado,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear estado de coger llave");
      }

      console.log("Estado recoger llave creado correctamente");
    } catch (error) {
      console.error("Error al crear estado recoger llave:", error);
    }
  };

  //DATASOURCES ( EXTERNALIZAR ) ----------------------------------------------------------------------------

  //Render
  return (
    <View style={PantallaRecogida.mainComponent}>
      <View style={PantallaRecogida.labels}>
        <View style={PantallaRecogida.imageContainer}>
          <Image
            source={icono}
            resizeMode="cover"
            style={PantallaRecogida.image}
          />
        </View>
        <View style={PantallaRecogida.contenedorLabels}>
          <View style={PantallaRecogida.iconosLabels}>
            <MaterialCommunityIcons name="account" size={20} color={"black"} />
            <Text style={PantallaRecogida.text}>{labelPersona}</Text>
          </View>
          <View style={PantallaRecogida.iconosLabels}>
            <MaterialCommunityIcons name="factory" size={20} color={"black"} />
            <Text style={PantallaRecogida.text}>{labelLavanderia}</Text>
          </View>
          <View style={PantallaRecogida.iconosLabels}>
            <MaterialCommunityIcons name="truck" size={20} color={"black"} />
            <Text style={PantallaRecogida.text}>{lavelVehiculo}</Text>
          </View>
        </View>
      </View>
      <View style={PantallaRecogida.contenedorDropdown}>
        <Dropdown
          style={PantallaRecogida.dropdown}
          data={datosDropdown}
          valueField="value"
          labelField="posicion"
          placeholder="Num. taquilla"
          value={posicionSeleccionada}
          onChange={(item) => {
            setPosicionSeleccionada(item.value);
            console.log("Seleccionado:", item.value);
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          disabled={dejar}
          style={[
            PantallaRecogida.boton,
            dejar && PantallaRecogida.botonDisabled,
          ]}
          onPress={() => {
            setRecoger(true);
            setDejar(true);
            postMovimientoRecogida();
          }}
        >
          <View style={PantallaRecogida.iconos}>
            <MaterialCommunityIcons
              name="key-chain"
              size={50}
              color={"white"}
            />
            <MaterialCommunityIcons
              name="arrow-up-bold"
              size={50}
              color={"white"}
            />
          </View>
          <Text style={PantallaRecogida.labelBoton}>RECOGER LLAVE</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          disabled={!dejar}
          style={[
            PantallaRecogida.boton,
            !dejar && PantallaRecogida.botonDisabled,
          ]}
          onPress={() => {
            setRecoger(false);
            setDejar(false);
            postMovimientoDejar();
          }}
        >
          <View style={PantallaRecogida.iconos}>
            <MaterialCommunityIcons
              name="key-chain"
              size={50}
              color={"white"}
            />
            <MaterialCommunityIcons
              name="arrow-down-bold"
              size={50}
              color={"white"}
            />
          </View>
          <Text style={PantallaRecogida.labelBoton}>DEJAR LLAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

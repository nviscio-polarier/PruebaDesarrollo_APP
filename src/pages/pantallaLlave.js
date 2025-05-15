import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PantallaLlave({ route }) {
  const [recoger, setRecoger] = useState(false);
  const [dejar, setDejar] = useState(false);
  const [registroRecogida, setRegistroRecogida] = useState([]);
  const [registroDejada, setRegistroDejada] = useState([]);

  // const { idLavanderia } = route.params;
  // const { idPersona } = route.params;
  // const { idVehiculo } = route.params;

  const crearRegistroEntrada = () => {
    const nuevoRegistroEntrada = {
      idTquilla: 1,
      idVehiculo: idVehiculo,
      idPersona: idPersona,
      fechaRecogida: new Date(),
    };

    setRegistroRecogida(nuevoRegistroEntrada);
    console.log("Registro de recogida realizado:", nuevoRegistroEntrada);

    //LOGICA POST
  };

  const crearRegistroDejada = () => {
    const nuevoRegistroDejada = {
      idTquilla: 1,
      idVehiculo: idVehiculo,
      idPersona: idPersona,
      fechaDejada: new Date(),
    };

    setRegistroDejada(nuevoRegistroDejada);
    console.log("Registro de dejada realizado:", nuevoRegistroDejada);

    //LOGICA POST
  };

  return (
    <View>
      <View style={styles.labels}>
        <Text>Nombre: Nico Viscio</Text>
        <Text>Lavanderia: Son Castello</Text>
        <Text>Vehiculo: IVECO ML 120E</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => {
            setRecoger(true);
            setDejar(true);
            crearRegistroEntrada();
            console.log("Recoger Pulsado");
          }}
        >
          <View style={styles.iconos}>
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
          <Text style={styles.labelBoton}>RECOGER LLAVE</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => {
            setRecoger(false);
            setDejar(false);
            crearRegistroDejada();
            console.log("Dejar Pulsado");
          }}
        >
          <View style={styles.iconos}>
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
          <Text style={styles.labelBoton}>DEJAR LLAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botonesComponente: {
    marginTop: "10px",
    width: "200px",
    marginLeft: "90px",
  },
  labels: {
    marginTop: "10px",
    marginBottom: "50px",
    marginLeft: "10px",
  },
  boton: {
    marginTop: 15,
    backgroundColor: "#EDB637",
    width: "90%",
    height: "150px",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  labelBoton: {
    marginTop: 10,
    color: "white",
    fontWeight: "bold",
  },
  iconos: {
    display: "flex",
    flexDirection: "row",
  },
});

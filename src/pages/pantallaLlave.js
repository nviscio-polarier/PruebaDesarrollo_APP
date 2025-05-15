import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function PantallaLlave({ route }) {
  const [recoger, setRecoger] = useState(false);
  const [dejar, setDejar] = useState(false);
  const [registroRecogida, setRegistroRecogida] = useState([]);
  const [registroDejada, setRegistroDejada] = useState([]);
  const { idLavanderia } = route.params;
  const { idPersona } = route.params;
  const { idVehiculo } = route.params;

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
        <View style={styles.botonesComponente}>
          <Button
            disabled={dejar}
            title="Recoger llave"
            onPress={() => {
              setRecoger(true);
              setDejar(true);
              crearRegistroEntrada();
              console.log("Recoger Pulsado");
            }}
          />
        </View>
      </View>
      <View>
        <View style={styles.botonesComponente}>
          <Button
            disabled={!recoger}
            title="Dejar llave"
            onPress={() => {
              setRecoger(false);
              setDejar(false);
              crearRegistroDejada();
              console.log("Dejar Pulsado");
            }}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.boton}>
            <Text>RECOGER LLAVE</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#eb4034",
    width: "20%",
    height: "120px",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
  },
});

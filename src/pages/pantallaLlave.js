import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import icono from "./fotos/icono.png";

export default function PantallaLlave({ route }) {
  const [recoger, setRecoger] = useState(false);
  const [dejar, setDejar] = useState(false);
  const [taquillaLavanderia, setTaquillaLavanderia] = useState([]);
  const [estadoTaquilla, setEstadoTaquilla] = useState([]);
  const [datosDropdown, setDatosDropdown] = useState([]);

  const [posicionSeleccionada, setPosicionSeleccionada] = useState([]);

  const [estado, setEstado] = useState(false);
  const date = new Date();

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

  //Recoge los estados de las posiciones de las taquillas
  useEffect(() => {
    const dataSourceGetEstadoTaquillas = async () => {
      try {
        const response = await fetch(
          `https://localhost:7136/odata/getRegistros`
        );
        const data = await response.json();
        setEstadoTaquilla(data);
        console.log("Datos estado Taquilla:", data);
      } catch (error) {
        console.log("ERROR API ESTADOS TAQUILLAS");
      }
    };
    dataSourceGetEstadoTaquillas();
  }, []);

  //Crea registro de recogida de llave ( EXTERNALIZAR )
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
            idTaquilla: 13,
            idVehiculo: idVehiculo,
            idPersona: idPersona,
            fechaRecogida: fechaFormateada,
            fechaDejar: null,
            posicion: 4,
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
            idTaquilla: 13,
            idVehiculo: idVehiculo,
            idPersona: idPersona,
            fechaRecogida: null,
            fechaDejar: fechaFormateada,
            posicion: 4,
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
            posicion: 1,
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

  return (
    <View style={styles.mainComponent}>
      <View style={styles.labels}>
        <View style={styles.imageContainer}>
          <Image source={icono} resizeMode="cover" style={styles.image} />
        </View>
        <View style={styles.contenedorLabels}>
          <View style={styles.iconosLabels}>
            <MaterialCommunityIcons name="account" size={20} color={"black"} />
            <Text style={styles.text}>{labelPersona}</Text>
          </View>
          <View style={styles.iconosLabels}>
            <MaterialCommunityIcons name="factory" size={20} color={"black"} />
            <Text style={styles.text}>{labelLavanderia}</Text>
          </View>
          <View style={styles.iconosLabels}>
            <MaterialCommunityIcons name="truck" size={20} color={"black"} />
            <Text style={styles.text}>{lavelVehiculo}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contenedorDropdown}>
        <Dropdown
          style={styles.dropdown}
          data={datosDropdown}
          valueField="value"
          labelField="label"
          placeholder="Num. taquilla"
          onChange={(item) => {
            setPosicionSeleccionada(item.value);
            console.log("Seleccionado:", item);
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          disabled={dejar}
          style={[styles.boton, dejar && styles.botonDisabled]}
          onPress={() => {
            setRecoger(true);
            setDejar(true);
            postMovimientoRecogida();
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
          disabled={!dejar}
          style={[styles.boton, !dejar && styles.botonDisabled]}
          onPress={() => {
            setRecoger(false);
            setDejar(false);
            postMovimientoDejar();
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
  mainComponent: {
    backgroundColor: "white",
    height: "100%",
  },
  botonesComponente: {
    marginTop: "10px",
    width: "200px",
    marginLeft: "90px",
  },
  labels: {
    marginTop: "10px",
    marginBottom: 20,
    marginLeft: "20px",
    marginRight: "20px",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#EDB637",
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  boton: {
    marginTop: 10,
    backgroundColor: "#EDB637",
    width: "89%",
    height: "150px",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  botonDisabled: {
    marginTop: 10,
    backgroundColor: "rgb(129,129,129)",
    width: "89%",
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
  iconosLabels: {
    display: "flex",
    flexDirection: "row",
  },
  contenedorLabels: {
    marginLeft: 10,
    marginTop: 3,
  },
  text: {
    marginLeft: 5,
  },
  image: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "#EDB637",
    alignContent: "center",
    justifyContent: "center",
  },
  contenedorDropdown: {
    padding: 16,
    marginLeft: 5,
    backgroundColor: "white",
    marginBottom: -15,
  },
  dropdown: {
    height: 40,
    width: "50%",
    borderColor: "#EDB637",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { dataSourceGetLavanderias } from "../services/canjeTokens";

const MainComponent = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   dataSourceGetLavanderias()
  //     .load()
  //     .then((data) => {
  //       setData(data);
  //       console.log("Clavanderias recibidias", data);
  //     })
  //     .catch((e) => {
  //       console.error("Error al cargar datos de labanderias:", e);
  //     });
  // }, []);

  return (
    <View>
      <Text>Hola</Text>
    </View>
  );
};

export default MainComponent;

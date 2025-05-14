export const aaaaaaa = async () => {
  try {
    const response = await fetch(
      `https://localhost:7136/odata/dataSourceGetLavanderias`
    );
    const result = await response.json();
    setDataTokens(result);
    console.log("Datos desde API:", result);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  } finally {
    setLoading(false);
  }
};

export const dataSourceGetLavanderias = async () => {
  try {
    const response = await fetch(
      `https://localhost:7136/odata/dataSourceGetLavanderias`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR API LAVANDERIAS");
    return 0;
  }
};

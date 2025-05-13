export const dataSourceGetLavanderias = async () => {
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

import { colors } from "../../styles/base";

export const PantallaLogin = {
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
};

export const PantallaRecogida = {
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
};

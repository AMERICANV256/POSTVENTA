import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

export const styles = StyleSheet.create({
  page: {
    padding: "20px",
  },

  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
    padding: "5px",
  },

  itemTitleADICIONAL: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 0,
  },

  border: {
    border: "1px solid black",
    width: "100%",
    marginBottom: "5px",
  },

  descuentos: {
    paddingBottom: "20px",
  },

  borderWord: {
    border: "1px solid black",

    marginBottom: "5px",
  },

  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "95%",
    marginVertical: 10,
    marginTop: "30px",
    alignSelf: "center",
  },
  itemTextLeft: {
    fontSize: "12px",
    textAlign: "left",
    width: "50%",
    padding: "5px",
  },

  itemTextLeftADICIONAL: {
    fontSize: "12px",
    textAlign: "left",
    width: "50%",
    padding: 0,
    marginTop: "10px",
  },

  itemTextFuncion: {
    fontSize: "12px",
    textAlign: "left",
    width: "50%",
  },

  itemTextFuncionADICIONAL: {
    fontSize: "12px",
    textAlign: "left",
    width: "50%",
    marginTop: "5px",
  },

  itemTextRight: {
    fontSize: "12px",
    textAlign: "right",
    width: "50%",
    padding: "5px",
  },

  itemTextRightADICIONAL: {
    fontSize: "12px",
    textAlign: "right",
    width: "30%",
  },

  itemTextRightADICIONALES: {
    fontSize: "12px",
    textAlign: "right",
    width: "50%",
  },

  itemTitleNroOrden: {
    fontSize: "12px",
    textAlign: "center",
    padding: "4px",
  },
  itemText: {
    fontSize: 10,
    marginVertical: 2,
    paddingLeft: "5px",
  },
  itemTextNegrita: {
    fontWeight: "bold",
    fontSize: "10px",
    marginBottom: "5px",
  },
  dninac: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  dninacio: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 5,
  },

  servicioContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  servicioText: {
    fontSize: 10,
    width: "70%",
    paddingLeft: "5px",
  },
  anosMesesDias: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "30%",
  },
  anosMesesDiasText: {
    fontSize: 10,
    marginHorizontal: 4,
    padding: "10px",
  },

  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  flex: {
    display: "flex",
    flexDirection: "row",
    marginRight: "10px",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5px",
    marginRight: "10px",
  },

  borderWord: {
    border: "1px solid black",
    padding: "5px",
    marginBottom: "10px",
  },

  borderWordCausal: {
    border: "1px solid black",
    padding: "5px",
    marginBottom: "10px",
    width: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  copia: {
    fontWeight: "bold",
    marginBottom: "30px",
    fontFamily: "Helvetica-Bold",
  },

  bold: {
    fontWeight: "bold",
  },

  itemValue: {
    textAlign: "center",
  },

  wrapper: {
    flex: 1,
    position: "relative",
  },
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  signatureWrapper: {
    alignItems: "center",
    width: "23%",
  },
  dottedLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    borderStyle: "dotted",
    marginBottom: 5,
  },
  signatureText: {
    fontWeight: "bold",
  },

  expedicion: {
    marginTop: "40px",
  },

  alignedRightContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
    marginBottom: -10,
    marginLeft: "auto",
    marginRight: "10px",
  },

  alignedRightContainerADICIONALES: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: "auto",
  },

  textRow: {
    flexDirection: "row",
  },

  spacedText: {
    marginHorizontal: 55,
  },

  padding: {
    padding: 5,
  },

  borderNoRegistra: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    width: "80%",
    margin: "auto",
    marginBottom: "15px",
  },
  noRegistraText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

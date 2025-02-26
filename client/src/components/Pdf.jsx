import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
} from "@react-pdf/renderer";
import { styles } from "../components/styles/StylesPdf";
import { FaFilePdf } from "react-icons/fa";

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

const MyDocument = ({ ticket, personalData }) => (
  <Document>
    <Page Page size={{ width: 595.28, height: 400 }} style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Datos Personales</Text>
        <View style={styles.row}>
          <Text style={styles.label}>
            Nombre:{" "}
            <Text style={styles.value}>
              {personalData.nombre} {personalData.apellido}
            </Text>
          </Text>
          <Text style={styles.label}>
            Razón Social:{" "}
            <Text style={styles.value}>{personalData.razonSocial}</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            CUIT: <Text style={styles.value}>{personalData.cuit}</Text>
          </Text>
        </View>
      </View>

      {/* Detalles del Ticket */}
      <View style={styles.section}>
        <Text style={styles.header}>Ticket #{ticket.id}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>
            Motivo: <Text style={styles.value}>{ticket.motivo}</Text>
          </Text>
          <Text style={styles.label}>
            Estado:{" "}
            <Text style={styles.value}>
              {ticket.Estado?.nombre || "Sin estado"}
            </Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            Derivado a:{" "}
            <Text style={styles.value}>
              {ticket.Derivado?.nombre || "No derivado"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Fecha del Reclamo:{" "}
            <Text style={styles.value}>{formatDate(ticket.createdAt)}</Text>
          </Text>
        </View>
      </View>

      {/* Información del Equipo */}
      {ticket.Equipo && (
        <View style={styles.section}>
          <Text style={styles.header}>Información del Equipo</Text>
          <View style={styles.row}>
            <Text style={styles.label}>
              Marca:{" "}
              <Text style={styles.value}>
                {ticket.Equipo.Marca?.nombre || "Sin marca"}
              </Text>
            </Text>
            <Text style={styles.label}>
              Modelo:{" "}
              <Text style={styles.value}>
                {ticket.Equipo.Modelo?.nombre || "Sin modelo"}
              </Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              Falla:{" "}
              <Text style={styles.value}>
                {ticket.Equipo.falla || "Sin falla reportada"}
              </Text>
            </Text>
            <Text style={styles.label}>
              Horas de Uso:{" "}
              <Text style={styles.value}>
                {ticket.Equipo.hsUso || "No especificado"}
              </Text>
            </Text>
          </View>
        </View>
      )}

      {/* Pie de página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          American Vial - Servicio de PostVenta
        </Text>
        <View style={styles.hr} />
      </View>
    </Page>
  </Document>
);

const Pdf = ({ ticket, data }) => {
  if (!ticket || !data) {
    console.error("Props faltantes: ticket o data no están definidos.");
    return null;
  }

  const personalData = {
    nombre: data.data.nombre || "Desconocido",
    apellido: data.data.apellido || "Desconocido",
    razonSocial: data.data.razonSocial || "Desconocido",
    cuit: data.data.cuit || "Desconocido",
  };

  return (
    <PDFDownloadLink
      document={<MyDocument ticket={ticket} personalData={personalData} />}
      fileName={`Ticket_${ticket.id}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <span style={{ color: "red" }}>
            Generando PDF... <FaFilePdf />
          </span>
        ) : (
          <span style={{ color: "lightcoral", fontWeight: "bold" }}>
            <FaFilePdf style={{ marginRight: "5px" }} />
            Descargar Ticket
          </span>
        )
      }
    </PDFDownloadLink>
  );
};

export default Pdf;

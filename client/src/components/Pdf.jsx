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
    <Page size={{ width: 595.28, height: 400 }} style={styles.page}>
      {/* Datos personales del reclamante */}
      <View style={styles.section}>
        <Text style={styles.header}>Datos Personales del Reclamante</Text>
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
        <Text style={styles.label}>
          CUIT: <Text style={styles.value}>{personalData.cuit}</Text>
        </Text>
      </View>

      {/* Reclamo */}
      <View style={styles.section}>
        <Text style={styles.header}>Ticket #{ticket.id}</Text>
        <Text style={styles.label}>
          <Text style={styles.label}>Motivo: </Text>
          {ticket.motivo}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.label}>Estado: </Text>
          {ticket.Estado?.nombre || "Sin estado"}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.label}>Derivado a: </Text>
          {ticket.Derivado?.nombre || "No derivado"}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.label}>Fecha de Creación: </Text>
          {formatDate(ticket.createdAt)}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.label}>Última Actualización: </Text>
          {formatDate(ticket.updatedAt)}
        </Text>
      </View>

      {/* Información del Equipo */}
      {ticket.Equipo ? (
        <View style={styles.section}>
          <Text style={styles.header}>Información del Equipo</Text>
          <Text style={styles.label}>
            <Text style={styles.label}>Marca: </Text>
            {ticket.Equipo.Marca?.nombre || "Sin marca"}
          </Text>
          <Text style={styles.label}>
            <Text style={styles.label}>Modelo: </Text>
            {ticket.Equipo.Modelo?.nombre || "Sin modelo"}
          </Text>
          <Text style={styles.label}>
            <Text style={styles.label}>Falla: </Text>
            {ticket.Equipo.falla || "Sin falla reportada"}
          </Text>
          <Text style={styles.label}>
            <Text style={styles.label}>Horas de Uso: </Text>
            {ticket.Equipo.hsUso || "No especificado"}
          </Text>
        </View>
      ) : (
        <Text style={styles.label}>
          No hay información del equipo disponible.
        </Text>
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

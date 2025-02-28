import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="copy">
      Copyright © {currentYear} | American Vial Todos los derechos reservados
    </div>
  );
}

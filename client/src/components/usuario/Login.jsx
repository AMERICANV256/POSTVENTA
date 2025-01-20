import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import Registro from "./Registro";
import { useNavigate } from "react-router-dom";

export default function Login({ handleCerrarModalLogin }) {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [registro, setRegistro] = useState(false);
  const [recover, setRecover] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const navigate = useNavigate();

  const handleCerrarModalRegistro = () => {
    setRegistro(false);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    try {
      // Petición al backend
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}usuarios/login`,
        {
          method: "POST",
          body: JSON.stringify(userToLogin),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await request.json();

      if (request.ok && data.status === "success") {
        const loggedUser = {
          apellido: data.loggedUser.apellido,
          direccion: data.loggedUser.direccion,
          email: data.loggedUser.email,
          nombre: data.loggedUser.nombre,
          telefono: data.loggedUser.telefono,
        };

        // Persistir los datos en el LocalStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        setSaved("login");
        window.location.reload();
      } else {
        setErrorMessage(
          data.error ||
            "Las credenciales son incorrectas. Por favor, verifícalas e inténtalo de nuevo."
        );
        setSaved("error");
      }
    } catch (error) {
      setErrorMessage(
        "Error al conectarse al servidor. Por favor, inténtalo de nuevo más tarde."
      );
      setSaved("error");
    }
  };

  return (
    <div>
      {!registro && (
        <div className="login-container">
          {/* <div className="registro">
            <Registro handleCerrarModalRegistro={handleCerrarModalRegistro} />
          </div> */}
          <form className="login-form" onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email" style={{ fontWeight: "bold" }}>
                Correo Electrónico <span className="obligatorio">*</span>
              </label>
              <input type="email" name="email" onChange={changed} required />
            </div>
            <div className="form-group">
              <label htmlFor="contraseña" style={{ fontWeight: "bold" }}>
                Contraseña <span className="obligatorio">*</span>
              </label>
              <input
                type="password"
                name="password"
                onChange={changed}
                required
              />
            </div>
            <br />
            <div className="buttonIngresarLogin">
              <input
                type="submit"
                value="Ingresar"
                className="form-registro-login"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useReclamo } from "../hooks/useReclamos";
import { useCliente } from "../hooks/useClientesReclamantes";
import CreatableSelect from "react-select/creatable";
import { useMarcas, useModelos } from "../hooks/useEquipo";
import { useEstados } from "../hooks/useEstados";
import { useDerivados } from "../hooks/useDerivados";
import InputMask from "react-input-mask";

export default function FormTickets() {
  const { mutate: formReclamo, isLoading } = useReclamo().reclamoMutation;

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    razonSocial: "",
    documento: "",
    direccion: "",
    cuit: "",
    telefono: "",
    telefono2: "",
    email: "",
    motivo: "",
    derivado: null,
    pdf: null,
    marca: null,
    modelo: null,
    hsUso: "",
    falla: "",
    estado: null,
  });

  const cuit = formData.cuit;

  const { data: clienteByCuit, isSuccess } =
    useCliente(cuit).clienteQueryByCuit;

  useEffect(() => {
    if (isSuccess && clienteByCuit) {
      setFormData((prevState) => ({
        ...prevState,
        nombre: clienteByCuit.nombre || "",
        apellido: clienteByCuit.apellido || "",
        razonSocial: clienteByCuit.razonSocial || "",
        documento: clienteByCuit.documento || "",
        telefono: clienteByCuit.telefono || "",
        telefono2: clienteByCuit.telefono2 || "",
        email: clienteByCuit.email || "",
        direccion: clienteByCuit.direccion || "",
      }));
    }
  }, [clienteByCuit, isSuccess]);

  // PARA MOSTRAR O CREAR LA MARCA Y EL MODELO //

  const { data: marcas, isLoading: loadingMarcas } = useMarcas();
  const { data: modelos, isLoading: loadingModelos } = useModelos();
  const { data: estados, isLoading: loadingEstados } = useEstados();
  const { data: derivados, isLoading: loadingDerivados } = useDerivados();

  const [selectedMarca, setSelectedMarca] = useState(null);
  const [selectedModelo, setSelectedModelo] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [selectedDerivados, setSelectedDerivados] = useState(null);

  const marcaOptions = marcas?.map((marca) => ({
    value: marca.id,
    label: marca.nombre,
  }));

  const modeloOptions = modelos?.map((modelo) => ({
    value: modelo.id,
    label: modelo.nombre,
  }));

  const estadosOptions = estados?.map((estado) => ({
    value: estado.id,
    label: estado.nombre,
  }));

  const derivadosOptions = derivados?.map((derivado) => ({
    value: derivado.id,
    label: derivado.nombre,
  }));

  const handleMarcaChange = (selectedOption) => {
    const marcaId = selectedOption ? parseInt(selectedOption.value, 10) : null;
    const nombreMarca = selectedOption ? selectedOption.label : null;
    setSelectedMarca(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      marca: marcaId,
      nombreMarca,
    }));
  };

  const handleModeloChange = (selectedOption) => {
    const modeloId = selectedOption ? parseInt(selectedOption.value, 10) : null;
    const nombreModelo = selectedOption ? selectedOption.label : null;
    setSelectedModelo(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      modelo: modeloId,
      nombreModelo,
    }));
  };

  const handleEstadoChange = (selectedOption) => {
    const estadoId = selectedOption ? parseInt(selectedOption.value, 10) : null;
    setSelectedEstado(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      estado: estadoId,
    }));
  };

  const handleDerivadoChange = (selectedOption) => {
    const derivadoId = selectedOption
      ? parseInt(selectedOption.value, 10)
      : null;
    setSelectedDerivados(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      derivado: derivadoId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let regex;
    let newValue = value;
    switch (name) {
      case "nombre":
      case "apellido":
        regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
        if (regex.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;

      case "documento":
      case "telefono":
        regex = /^[0-9]*$/;
        if (regex.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;

      case "cuit":
        newValue = value.replace(/-/g, "").replace(/[^0-9]/g, "");

        regex = /^[0-9]{0,11}$/;
        if (regex.test(newValue)) {
          setFormData({ ...formData, [name]: newValue });
        }
        break;
      case "email":
        newValue = value.replace(/[^a-zA-Z0-9@._-]/g, "");
        setFormData({ ...formData, [name]: newValue });
        break;

      case "direccion":
        newValue = value.replace(/[^a-zA-Z0-9\s.,-]/g, "");
        setFormData({ ...formData, [name]: newValue });
        break;

      default:
        setFormData({ ...formData, [name]: value });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formReclamo(formData);

    setFormData({
      nombre: "",
      apellido: "",
      razonSocial: "",
      documento: "",
      cuit: "",
      telefono: "",
      telefono2: "",
      direccion: "",
      email: "",
      motivo: "",
      derivado: null,
      pdf: null,
      marca: null,
      modelo: null,
      hsUso: "",
      falla: "",
      estado: null,
    });
  };

  return (
    <div className="clientFormContainer">
      <h2>Ingresar Reclamo</h2>
      <hr />
      <form className="clientForm" onSubmit={handleSubmit}>
        <div className="formGrid">
          <label>
            CUIT:<span className="obligatorio">*</span>
            <InputMask
              mask="99-99999999-9"
              value={formData.cuit}
              onChange={handleChange}
            >
              {(inputProps) => (
                <input {...inputProps} type="text" name="cuit" />
              )}
            </InputMask>
          </label>
          <label>
            Nombre: <span className="obligatorio">*</span>
            <input
              type="text"
              name="nombre"
              max={100}
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Apellido:<span className="obligatorio">*</span>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              maxLength={100}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Razón Social:<span className="obligatorio">*</span>
            <input
              type="text"
              name="razonSocial"
              value={formData.razonSocial}
              maxLength={100}
              onChange={handleChange}
            />
          </label>
          <label>
            Documento:<span className="obligatorio">*</span>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              maxLength={10}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Dirección:
            <input
              type="text"
              name="direccion"
              maxLength={100}
              value={formData.direccion}
              onChange={handleChange}
            />
          </label>
          <label>
            Teléfono:<span className="obligatorio">*</span>
            <input
              type="text"
              name="telefono"
              maxLength={50}
              value={formData.telefono}
              onChange={handleChange}
            />
          </label>
          <label>
            Teléfono alternativo:
            <input
              type="text"
              maxLength={50}
              name="telefono2"
              value={formData.telefono2}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:<span className="obligatorio">*</span>
            <input
              type="email"
              name="email"
              maxLength={100}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br />
        <div className="marca-modelo-container">
          <h2>Selecciona Marca y Modelo del equipo</h2>
          <br />

          <div className="formGrid">
            <label>
              Marca:<span className="obligatorio">*</span>
            </label>
            <label>
              Modelo:<span className="obligatorio">*</span>
            </label>
            <CreatableSelect
              isClearable
              isLoading={loadingMarcas}
              options={marcaOptions}
              value={selectedMarca}
              onChange={handleMarcaChange}
              placeholder="Selecciona o crea una marca"
            />

            <CreatableSelect
              isClearable
              isLoading={loadingModelos}
              options={modeloOptions}
              maxLength={100}
              value={selectedModelo}
              onChange={handleModeloChange}
              placeholder="Selecciona o crea un modelo"
            />

            <label>
              Horas de uso:<span className="obligatorio">*</span>
              <input
                type="text"
                name="hsUso"
                maxLength={50}
                value={formData.hsUso}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Falla:<span className="obligatorio">*</span>
              <input
                type="text"
                name="falla"
                maxLength={100}
                value={formData.falla}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Derivar:
              <Select
                name="derivado"
                value={derivadosOptions?.find(
                  (option) => option.value === formData.derivado
                )}
                onChange={handleDerivadoChange}
                options={derivadosOptions}
                placeholder="Seleccionar"
                className="react-select"
                isClearable
              />
            </label>
            <label>
              Estado:
              <Select
                name="estado"
                value={estadosOptions?.find(
                  (option) => option.value === formData.estado
                )}
                onChange={handleEstadoChange}
                options={estadosOptions}
                placeholder="Seleccionar"
                className="react-select"
                isClearable
              />
            </label>

            <label className="fullWidth">
              Motivo de contacto: <span className="obligatorio">*</span>
              <textarea
                name="motivo"
                maxLength={500}
                value={formData.motivo}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </label>
          </div>
        </div>
        <div className="create-button-reclamo">
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}

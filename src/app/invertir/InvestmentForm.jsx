"use client";
import react from "react";
import { useState } from "react";
import { Label, TextInput, Button, Modal } from "keep-react";
import { WarningCircle } from "phosphor-react";

const InvestmentForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");

  const [apellidoM, setapellidoM] = useState("");

  const [rfc, setRfc] = useState("");

  const [fecha, setFecha] = useState("");

  const [grado, setGrado] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [profesion, setProfesion] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    if (
      !nombre ||
      !apellidoP ||
      !apellidoM ||
      !rfc ||
      !fecha ||
      !grado ||
      !empresa ||
      !profesion ||
      !correo ||
      !telefono
    ) {
      setErrorMsg("Todos los campos son obligatorios");
      setError(true);
      return;
    }

    if (rfc.length && rfc.length !== 13) {
      setErrorMsg("El RFC debe contener 13 caracteres");
      setError(true);
      return;
    }

    if (telefono.length && (telefono.length !== 10 || isNaN(telefono))) {
      setErrorMsg("El telefono debe ser un numero de 10 digitos");
      setError(true);
      return;
    }

    const reg = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    if (!reg.test(correo)) {
      setErrorMsg("Debes Ingresar un correo valido");
      setError(true);
      return;
    }
  };

  return (
    <div className="flex flex-col md:m-10 border rounded-lg p-5 shadow-lg gap-5">
      <h1 className="text-xl md:text-5xl text-center font-bold">
        Una Inversion Segura
      </h1>
      <p className="text-center text-md md:text-xl font-normal">
        <b>Inicia tu vida de inversionista con nosotros</b>
      </p>
      <div className="gap-5 flex-col">
        <Label htmlFor="Nombre" value="Nombre" />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="Nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
        />
        <Label htmlFor="ApellidoP" value="Apellido Paterno" />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="ApellidoP"
          value={apellidoP}
          onChange={(event) => setApellidoP(event.target.value)}
        />
        <Label htmlFor="ApellidoM" value="Apellido Materno" />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="ApellidoM"
          value={apellidoM}
          onChange={(event) => setapellidoM(event.target.value)}
        />
        <Label htmlFor="RFC" value="RFC" />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="RFC"
          type="text"
          maxLength={13}
          value={rfc}
          onChange={(event) => setRfc(event.target.value)}
        />
        <Label htmlFor="FechaNac" value="Fecha de Nacimiento" />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="FechaNac"
          type="date"
          value={fecha}
          onChange={(event) => setFecha(event.target.value)}
        />
        <Label htmlFor="Grado" value="Grado Academico" />
        <select
          className="p-3 w-full rounded-lg bg-white border shadow-md"
          value={grado}
          onChange={(event) => {
            setGrado(event.target.value);
          }}
          name="pets"
          id="Grado"
        >
          <option value="">Grado Academico</option>
          <option value="Primaria">Primaria</option>
          <option value="Secundaria">Secundaria</option>
          <option value="Bachillerato">Bachillerato</option>
          <option value="TSU">TSU</option>
          <option value="Licenciatura">Licenciatura</option>
          <option value="Ingenieria">Ingenieria</option>
          <option value="Maestria">Maestria</option>
          <option value="Doctorado">Doctorado</option>
        </select>
        <Label htmlFor="Empresa" value="Empresa o Escuela" />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="Empresa"
          value={empresa}
          onChange={(event) => setEmpresa(event.target.value)}
        />
        <Label htmlFor="Profesion" value="Profesion" />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="Profesion"
          value={profesion}
          onChange={(event) => setProfesion(event.target.value)}
        />
        <Label htmlFor="Correo" value="Correo Electronico" />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="Correo"
          value={correo}
          onChange={(event) => setCorreo(event.target.value)}
        />
        <Label htmlFor="Telefono" value="Telefono Celular" />
        <input
          type="text"
          value={telefono}
          maxLength={10}
          className="w-full p-2 border rounded-lg shadow-md"
          id="Telefono"
          onChange={(event) => setTelefono(event.target.value)}
        />
      </div>
      <div className="self-center m-5 ">
        <Button type={"primary"} onClick={() => validate()}>
          Siguiente
        </Button>
      </div>
      <Modal
        icon={<WarningCircle size={28} color="#E92215" />}
        size="md"
        show={error}
        onClose={() => setError(!error)}
      >
        <Modal.Header>{errorMsg}</Modal.Header>
        <Modal.Footer>
          <Button type="outlineGray" onClick={() => setError(!error)}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InvestmentForm;

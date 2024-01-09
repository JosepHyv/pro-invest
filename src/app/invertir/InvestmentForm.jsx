"use client";
import react from "react";
import { useState, useEffect } from "react";
import { Label, TextInput, Button, Modal, Dropdown, Upload } from "keep-react";
import { WarningCircle, CheckCircle } from "phosphor-react";
import axios from "axios";
import useInversionTypeStorage from "../hooks/tiposInversionStorage";

const InvestmentForm = () => {
  const { inversionTypes, setInv } = useInversionTypeStorage();
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");

  const [apellidoM, setapellidoM] = useState("");

  const [rfc, setRfc] = useState("");

  const [fecha, setFecha] = useState("");
  const [tipoInversion, setTipoInversion] = useState(
    "Selecciona el tipo de inversión"
  );

  const [grado, setGrado] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [profesion, setProfesion] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [importe, setImporte] = useState(0);
  const [tiempo, setTiempo] = useState(1);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [pass, setPass] = useState(false);

  const handleFileChange = (event, setter) => {
    const file = event.target.files[0];
    if (file) {
      console.log(event.target.files[0].name);
      setter(file.name);
    }
  };

  useEffect(() => {
    const url =
      "https://proinvestapi.azurewebsites.net/InvestmentType/GetInvestmentTypes";
    axios
      .get(url)
      .then((res) => {

        setInv(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [setInv]);

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
      !telefono ||
      !importe ||
      !file1 ||
      !file2 ||
      !file3
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

    if (importe < 10000) {
      setErrorMsg("El importe debe ser de al menos $10,000 MXN");
      setError(true);
      return;
    }
    const elements = [];
    inversionTypes.forEach((element) => {
      elements.push(element.typeName);
    });


    if (!elements.includes(tipoInversion)) {
      setErrorMsg("Selecciona un tipo de inversion valido");
      setError(true);
      return;
    }
    const url = "https://proinvestapi.azurewebsites.net/Client/RegisterClient";
    const body = {
      name: nombre,
      lastName: apellidoP + " " + apellidoM,
      rfc: rfc.toUpperCase(),
      birthDay: fecha,
      academicDegree: grado,
      profession: profesion,
      companyName: empresa,
      phoneNumber: telefono,
    };
    console.log(body);
    axios
      .post(url, body)
      .then((res) => {
        const selectetType = elements.findIndex(
          (item) => item === tipoInversion
        );

        const crecimiento = inversionTypes[selectetType].anualInterestRate;
        let anterior = Number(importe);
        for (let i = 1; i <= tiempo; i++) {
          const nuevoi = anterior + anterior * (crecimiento / 100);
          anterior = nuevoi;
        }

        const registry =
          "https://proinvestapi.azurewebsites.net/InvestmentRequest/PutInvestmentRequest";

        const invest = {
          idInvestmentRequest: 0,
          clientId: res.data,
          date: "2024-01-08T11:13:05.548Z",
          status: 0,
          investmentFolio: "string",
          ipaddress: "string",
          investmentSimulatorId: 0,
          originOfFoundsId: 1,
          bankId: 1,
          investmentAmout: Number(importe),
          investmentTerm: tiempo,
          stimatedResult: anterior,
          investmentType: inversionTypes[selectetType].idInvestmentType,
        };

        axios
          .post(registry, invest)
          .then((res2) => {
            setErrorMsg(`Tu folio es ${res2.data}`);
            setPass(true);
          })
          .catch((res2) => {
            console.log(res2);
            setErrorMsg("Ocurrio un erro al hacer la solicitud de inversión");
            setError(true);
          });
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
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
          value={rfc.toUpperCase()}
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
        {/* <Label htmlFor="Correo" value="Correo Electronico" />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="Correo"
          value={correo}
          onChange={(event) => setCorreo(event.target.value)}
        /> */}
        <Label htmlFor="Telefono" value="Telefono Celular" />
        <input
          type="text"
          value={telefono}
          maxLength={10}
          className="w-full p-2 border rounded-lg shadow-md"
          id="Telefono"
          onChange={(event) => setTelefono(event.target.value)}
        />
        <Label htmlFor="Importe" value="Importe Inicial" />
        <input
          type="number"
          min="0"
          step="10000"
          value={importe}
          className="w-full p-2 border rounded-lg shadow-md"
          id="Importe"
          onChange={(event) => setImporte(event.target.value)}
        />
        <Label
          className="text-md md:text-xl"
          htmlFor="tipo"
          value="Tipo de Inversión"
        />
        <Dropdown
          id="tipo"
          label={tipoInversion}
          size="lg"
          type="outlinePrimary"
          dismissOnClick={true}
        >
          {inversionTypes.map((item) => (
            <Dropdown.Item
              key={item.idInvestmentType}
              onClick={(event) => {
                console.log(item.typeName);
                setTipoInversion(item.typeName);
              }}
            >
              {item.typeName}
            </Dropdown.Item>
          ))}
        </Dropdown>
        <Label className="text-md md:text-xl" htmlFor="tiempo" value="plazo" />
        <input
          className="w-full"
          id="tiempo"
          type="range"
          min="1"
          max="5"
          value={tiempo}
          onChange={(event) => {
            console.log(event.target.valueAsNumber);
            setTiempo(event.target.valueAsNumber);
          }}
          step="1"
        />
        <Label
          className="text-md md:text-xl"
          htmlFor="credencial"
          value="Credencial"
        />
        <Upload
          onFileChange={(event) => handleFileChange(event, setFile1)}
          file={file1}
          horizontal={true}
          id="credencial"
        />
        <Label
          className="text-md md:text-xl"
          htmlFor="domicilio"
          value="Comprobante de Domicilio"
        />
        <Upload
          onFileChange={(event) => handleFileChange(event, setFile2)}
          file={file2}
          horizontal={true}
          id="domicilio"
        />
        <Label
          className="text-md md:text-xl"
          htmlFor="estudios"
          value="Comprobante de estudios"
        />
        <Upload
          onFileChange={(event) => handleFileChange(event, setFile3)}
          file={file3}
          horizontal={true}
          id="estudios"
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
      <Modal
        icon={<CheckCircle size={28} color="#65B556" />}
        size="md"
        show={pass}
        onClose={() => setPass(!pass)}
      >
        <Modal.Header>{errorMsg}</Modal.Header>
        <Modal.Footer>
          <Button type="outlineGray" onClick={() => setPass(!pass)}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InvestmentForm;

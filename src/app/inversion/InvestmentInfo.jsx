"use client";
import react from "react";
import { useState } from "react";
import { Button, Label, TextInput, Modal } from "keep-react";
import { WarningCircle } from "phosphor-react";
import axios from "axios";

const InvestmentInfo = () => {
  const [folio, setFolio] = useState("");
  const [folior, setFolior] = useState("");
  const [importe, setImporte] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [button, setButton] = useState("dashed");
  const [pass, setPass] = useState(false);
  const validate = () => {
    // if (isNaN(folio)) {
    //   setErrorMsg("El folio debe ser un numero");
    //   setError(true);
    // }
    // if (!isNaN(folio) && !Number.isInteger(Number(folio))) {
    //   setErrorMsg("El folio debe ser un numero entero");
    //   setError(true);
    // }
    if (!folio) {
      setErrorMsg("Debes ingresar el folio");
      setError(true);
      return;
    }

    axios
      .get(
        `https://proinvestapi.azurewebsites.net/InvestmentRequest/GetInvestmentRequestByFolio/${folio}`
      )
      .then((res) => {
        setFolior(folio);
        setImporte(`$${res.data.investmentAmout} MXN`);
        const fecha = new Date(res.data.date);
        setFecha(
          `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
        );
        setButton("outlinePrimary");
        setPass(true);
        console.log(res.data);
      })
      .catch(() => {
        setErrorMsg("No Pudimos Encontrar el Folio");
        setError(true);
      });
  };

  const descarga = () => {
    if (pass) {
    }
  };

  return (
    <div className="flex flex-col md:m-10 md:border p-5 rounded-lg shadow-lg">
      <h1 className="text-center text-3xl font-bold md:text-3xl">
        Descarga tu contrato de inversión
      </h1>
      <div className="m-5">
        <Label
          className="text-xl"
          htmlFor="folio"
          value="Ingresa tu folio de Inversión"
        />
        <input
          className="w-full p-2 border rounded-lg shadow-md"
          id="folio"
          type="text"
          placeholder="Ej: 1234"
          value={folio}
          onChange={(event) => setFolio(event.target.value)}
        />
      </div>
      <div className="flex-col m-5 border rounded-md shadow-md">
        <div className="flex p-5 flex-row justify-around gap-5 ">
          <h3 className="font-semibold text-xl">Folio</h3>
          <p className="font-normal text-xl">{folior}</p>
        </div>
        <hr />
        <div className="flex p-5 flex-row justify-around gap-5 ">
          <h3 className="font-semibold text-xl">Importe</h3>
          <p className="font-normal text-xl">{importe}</p>
        </div>
        <hr />

        <div className="flex p-5 flex-row justify-around gap-5 ">
          <h3 className="font-semibold text-xl">Fecha</h3>
          <p className="font-normal text-xl">{fecha}</p>
        </div>
        <hr />
      </div>
      <div className="flex flex-row gap-10 self-center m-5">
        <Button type="primary" onClick={() => validate()}>
          Obtener
        </Button>
        <Button type={button} onClick={() => descarga()}>
          Descargar
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

export default InvestmentInfo;

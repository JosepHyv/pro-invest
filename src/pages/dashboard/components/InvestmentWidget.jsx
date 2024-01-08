"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  Label,
  TextInput,
  Dropdown,
  Slider,
  Button,
  Modal,
  CheckBox,
} from "keep-react";
import { WarningCircle } from "phosphor-react";

const SimulaeInvestmentWidget = () => {
  const [importe, setImporte] = useState(0);
  const [tipoInversion, setTipoInversion] = useState(
    "Selecciona el tipo de inversión"
  );
  const [tiempo, setTiempo] = useState(1);
  const [modalVisible, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState("");
  const validate = () => {
    let fail = false;
    if (importe < 10000) {
      setErrorMsg("El Importe debe ser de un minimo de $10000 MXN");
      fail = true;
    }
    if (tipoInversion != "CETES" && tipoInversion != "SP500") {
      setErrorMsg("Selecciona un tipo de inversion valido");
      fail = true;
    }

    setError(fail);
  };

  return (
    <div className="m-5  md:w-1/2 flex flex-col bg-slate-50 gap-10 rounded-lg shadow-lg">
      <div className="text-center  p-3 bg-slate-200 rounded-t-lg">
        <h1 className="text-xl md:text-3xl font-semibold">
          Simular tu inversion
        </h1>
      </div>
      <div className="flex-col p-5 gap-10">
        <Label
          className="text-md md:text-xl"
          htmlFor="importe"
          value="Ingresa tu importe desde $10,000 MXN"
        />
        <TextInput
          id="importe"
          type="number"
          step="10000"
          min="0"
          value={importe}
          handleOnChange={(event) => setImporte(event.target.valueAsNumber)}
          required
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
          <Dropdown.Item
            onClick={(event) => {
              setTipoInversion("Selecciona el tipo de inversión");
            }}
          >
            Selecciona el tipo de inversión
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(event) => {
              setTipoInversion("CETES");
            }}
          >
            CETES
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(event) => {
              setTipoInversion("SP500");
            }}
          >
            SP500
          </Dropdown.Item>
        </Dropdown>
        <Label
          className="text-md md:text-xl"
          htmlFor="tiempo"
          value="¿En cuánto tiempo te gustaría obtener tus rendimientos?"
        />
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
      </div>
      <div className="self-center p-3 ">
        <Button
          onClick={() => {
            validate();
          }}
          type={"primary"}
        >
          Simular Ahora
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

const CompareInvestmentWidget = () => {
  const [importe, setImporte] = useState(0);
  const [cetes, setSetes] = useState(false);
  const [sp, setSP] = useState(false);
  const [tipoInversion, setTipoInversion] = useState([]);
  const [tiempo, setTiempo] = useState(1);
  const [modalVisible, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    // console.log(cetes, sp);
    let fail = false;
    if (importe < 10000) {
      setErrorMsg("El Importe debe ser de un minimo de $10000 MXN");
      fail = true;
    }
    if (!cetes || !sp) {
      setErrorMsg("Debes Seleccionar al menos 2 tipos de inversion");
      fail = true;
    }

    setError(fail);
  };

  return (
    <div className="m-5 md:w-1/2 flex flex-col bg-slate-50 gap-10 rounded-lg shadow-lg">
      <div className="text-center  p-3 bg-slate-200 rounded-t-lg">
        <h1 className="text-xl md:text-3xl font-semibold">
          Compara tu inversion
        </h1>
      </div>
      <div className="flex-col p-5 gap-10">
        <Label
          className="text-md md:text-xl"
          htmlFor="importe"
          value="Ingresa tu importe desde $10,000 MXN"
        />
        <TextInput
          id="importe"
          type="number"
          value={importe}
          step="10000"
          min="0"
          handleOnChange={(event) => setImporte(event.target.valueAsNumber)}
          required
        />
        <Label
          className="text-md md:text-xl"
          htmlFor="tipo"
          value="Selecciona el tipo de inversión"
        />
        <Dropdown
          id="tipo"
          label={"Tipos De Inversión"}
          size="lg"
          pill
          type="outlinePrimary"
          dismissOnClick={true}
        >
          <Dropdown.Item>
            <div className="flex items-center">
              <CheckBox
                // id="#id1"
                label="CETES"
                name="CETES"
                size="sm"
                handleChecked={(value) => setSetes(value)}
              />
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className="flex items-center">
              <CheckBox
                id="#id2"
                label="SP500"
                name="SP500"
                size="sm"
                handleChecked={(value) => setSP(value)}
              />
            </div>
          </Dropdown.Item>
        </Dropdown>
        <Label
          className="text-md md:text-xl"
          htmlFor="tiempo"
          value="¿En cuánto tiempo te gustaría obtener tus rendimientos?"
        />
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
      </div>
      <div className="self-center p-3 ">
        <Button
          onClick={() => {
            validate();
          }}
          type={"primary"}
        >
          Comparar Ahora
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

export { CompareInvestmentWidget, SimulaeInvestmentWidget };

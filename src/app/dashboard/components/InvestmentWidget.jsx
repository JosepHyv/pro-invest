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
import {
  useSimulationStore,
  useComparationStore,
} from "@/app/hooks/inversionStorage";
import useInversionTypeStorage from "@/app/hooks/tiposInversionStorage";

const SimulaeInvestmentWidget = () => {
  const { inversionTypes } = useInversionTypeStorage();
  const { simulation, setSim } = useSimulationStore();
  const [importe, setImporte] = useState(0);
  const [tipoInversion, setTipoInversion] = useState(
    "Selecciona el tipo de inversión"
  );
  const [tiempo, setTiempo] = useState(1);
  const [modalVisible, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState("");
  const validate = () => {
    if (importe < 10000) {
      setErrorMsg("El Importe debe ser de un minimo de $10000 MXN");
      setError(true);
      return;
    }

    const elements = [];
    inversionTypes.forEach((element) => {
      elements.push(element.typeName);
    });

    // console.log(elements);
    if (!elements.includes(tipoInversion)) {
      setErrorMsg("Selecciona un tipo de inversion valido");
      setError(true);
      return;
    }

    const pos = elements.findIndex((item) => item === tipoInversion);
    const sim = {
      importe,
      tiempo,
      tipoInversion,
      interes: inversionTypes[pos].anualInterestRate,
    };

    console.log(sim);
    setSim(sim);
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
  const { setCom } = useComparationStore();
  const { inversionTypes } = useInversionTypeStorage();
  const [importe, setImporte] = useState(0);
  const [tipoInversion, setTipoInversion] = useState("Tipo De Inversion 1");
  const [tipoInversion2, setTipoInversion2] = useState("Tipo De Inversion 2");
  const [tiempo, setTiempo] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    // console.log(cetes, sp);

    if (importe < 10000) {
      setErrorMsg("El Importe debe ser de un minimo de $10000 MXN");
      setError(true);
      return;
    }

    const elements = [];
    inversionTypes.forEach((element) => {
      elements.push(element.typeName);
    });

    if (
      !elements.includes(tipoInversion) ||
      !elements.includes(tipoInversion2)
    ) {
      setErrorMsg("Debes Seleccionar al menos 2 tipos de inversion");
      setError(true);
      return;
    }

    const pos1 = elements.findIndex((item) => item === tipoInversion);
    const pos2 = elements.findIndex((item) => item === tipoInversion2);

    const sim = {
      importe,
      tiempo,
      tipoInversion,
      segundoTipo: tipoInversion2,
      interes: inversionTypes[pos1].anualInterestRate,
      segundoInteres: inversionTypes[pos2].anualInterestRate,
    };
    setCom(sim);
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
        <div className="flex flex-row gap-5">
          <Dropdown
            id="tipo"
            label={tipoInversion}
            pill
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
          <Dropdown
            id="tipo"
            label={tipoInversion2}
            pill
            size="lg"
            type="outlinePrimary"
            dismissOnClick={true}
          >
            {inversionTypes.map((item) => (
              <Dropdown.Item
                key={item.idInvestmentType}
                onClick={(event) => {
                  console.log(item.typeName);
                  setTipoInversion2(item.typeName);
                }}
              >
                {item.typeName}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
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

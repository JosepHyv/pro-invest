"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Sidebar, Navbar } from "keep-react";
import { ChartLineUp } from "phosphor-react";
import {
  SimulaeInvestmentWidget,
  CompareInvestmentWidget,
} from "./components/InvestmentWidget";
import {
  InvestmentChart,
  ComparationChart,
} from "./components/InvestmentChart";
import axios from "axios";
import {
  useComparationStore,
  useSimulationStore,
} from "../hooks/inversionStorage";
import useInversionTypeStorage from "../hooks/tiposInversionStorage";

const Dashboard = () => {
  // const [, setTipos] = useState([]);
  const { setInv } = useInversionTypeStorage();
  const { setSim } = useSimulationStore();
  const { setCom } = useComparationStore();
  useEffect(() => {
    setSim({});
    setCom({});
    const url =
      "https://proinvestapi.azurewebsites.net/InvestmentType/GetInvestmentTypes";
    const config = {
      headers: {
        // "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setInv(res.data);
      })
      .catch((res) => {
        console.log("De nuevo");
        console.log(res);
      });
  }, []);

  return (
    <div className="h-full w-full flex flex-col ">
      <div className="flex flex-col justify-around md:m-10 ">
        <div className="flex flex-col md:flex-row justify-around">
          <SimulaeInvestmentWidget />
          <InvestmentChart title={"Simular Inversion"} />
        </div>
        <div className="flex flex-col md:flex-row justify-around">
          <CompareInvestmentWidget />
          <ComparationChart title="Comparar Inversiones" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);

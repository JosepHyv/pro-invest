"use client";

import React from "react";
import { Sidebar, Navbar } from "keep-react";
import { ChartLineUp } from "phosphor-react";
import {
  SimulaeInvestmentWidget,
  CompareInvestmentWidget,
} from "./components/InvestmentWidget";
import InvestmentChart from "./components/InvestmentChart";

const Dashboard = () => {
  return (
    <div className="h-screen w-screen flex flex-col ">
      <div className="flex flex-col justify-around md:m-10 ">
        <div className="flex flex-col md:flex-row justify-around">
          <SimulaeInvestmentWidget />
          <InvestmentChart />
        </div>
        <div className="flex flex-col md:flex-row justify-around">
          <CompareInvestmentWidget />
          <InvestmentChart />
        </div>
      </div>
      {/* <div className="h-screen w-full flex flex-col items-center border border-black"></div> */}
    </div>
  );
};

export default React.memo(Dashboard);

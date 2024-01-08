import React from "react";
import { BarChart } from "keep-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  useSimulationStore,
  useComparationStore,
} from "@/app/hooks/inversionStorage";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const InvestmentChart = ({ title }) => {
  const { simulation } = useSimulationStore();
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      colors: {
        enabled: true,
        // forceOverride: true
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 25,
        },
      },
    },
  };

  let labels = [];
  let data = { labels, datasets: [] };
  if (simulation) {
    const original = [];
    const nuevo = [];
    let anterior = simulation.importe;
    for (let i = 1; i <= simulation.tiempo; i++) {
      labels.push(`Año ${i}`);
      original.push(simulation.importe);
      const nuevoi = anterior + anterior * (simulation.interes / 100);
      nuevo.push(nuevoi);
      anterior = nuevoi;
    }

    data = {
      labels,
      datasets: [
        {
          label: "Inversion",
          data: original,
          //   backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Crecimiento",
          data: nuevo,
        },
      ],
    };
  }

  return (
    <div className="flex h-auto w-auto md:h-auto md:w-1/2  m-5 ">
      <Bar options={options} data={data} />
    </div>
  );
};

const ComparationChart = ({ title }) => {
  const { comparation } = useComparationStore();
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      colors: {
        enabled: true,
        forceOverride: true,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 25,
        },
      },
    },
  };

  let labels = [];
  let data = { labels, datasets: [] };
  if (comparation) {
    const original = [];
    const inv1 = [];
    const inv2 = [];
    let anterior1 = comparation.importe;
    let anterior2 = comparation.importe;
    for (let i = 1; i <= comparation.tiempo; i++) {
      labels.push(`Año ${i}`);
      original.push(comparation.importe);
      const nuevo1 = anterior1 + anterior1 * (comparation.interes / 100);
      const nuevo2 = anterior2 + anterior2 * (comparation.segundoInteres / 100);
      inv1.push(nuevo1);
      inv2.push(nuevo2);

      anterior1 = nuevo1;
      anterior2 = nuevo2;
    }

    data = {
      labels,
      datasets: [
        {
          label: "Inversion",
          data: original,
          //   backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: comparation.tipoInversion
            ? comparation.tipoInversion
            : "Tipo De Inversion 1",
          data: inv1,
        },
        {
          label: comparation.segundoTipo
            ? comparation.segundoTipo
            : "Tipo De Inversion 2",
          data: inv2,
        },
      ],
    };
  }

  return (
    <div className="flex h-auto w-auto md:h-auto md:w-1/2  m-5 ">
      <Bar options={options} data={data} />
    </div>
  );
};

export { InvestmentChart, ComparationChart };

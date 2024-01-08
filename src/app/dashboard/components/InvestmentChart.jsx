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

const BarChartData = [
  {
    name: "2",
    price: 340,
    sell: 140,
  },
  {
    name: "4",
    price: 300,
    sell: 200,
  },
  {
    name: "6",
    price: 170,
    sell: 120,
  },
  {
    name: "8",
    price: 190,
    sell: 130,
  },
  {
    name: "10",
    price: 450,
    sell: 120,
  },
];

const InvestmentChart = ({ title, dataRecover }) => {
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
        text: "Inversiones",
        font: {
          size: 25,
        },
      },
    },
  };

  const labels = [1, 2, 3];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [100, 200, 300, 400, 500],
        //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [4, 5, 6, 7, 8],
        //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      // {
      //   label: "Dataset 3",
      //   data: [1, 2, 3, 4, 5],
      //   //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
      // {
      //   label: "Dataset 4",
      //   data: [1, 2, 3, 4, 5],
      //   //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };
  return (
    <div className="flex h-auto w-auto md:h-auto md:w-1/2  m-5 ">
      <Bar options={options} data={data} />
    </div>
  );
};

export default InvestmentChart;

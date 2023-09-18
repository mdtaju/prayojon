import React from 'react';

import {
      CategoryScale,
      Chart as ChartJS,
      Legend,
      LineElement,
      LinearScale,
      PointElement,
      Title,
      Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
);

export const options = {
      responsive: true,
      plugins: {
            legend: {
                  position: 'top',
            },
            // title: {
            //       display: true,
            //       text: 'Chart.js Line Chart',
            // },
      },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"];

const GraphChart = ({ money = [], label = "" }) => {
      // const money = [2000, 1500, 4000, 3210, 3920, 5829]
      const data = {
            labels,
            datasets: [
                  {
                        label: label,
                        data: labels.map((m, i) => {
                              return money[i]
                        }),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
            ],
      };
      return (
            <div>
                  <Line options={options} data={data} />
            </div>
      );
};

export default GraphChart;
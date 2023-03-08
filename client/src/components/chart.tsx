import type { ChartData, ChartOptions } from 'chart.js';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
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
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Game Progress',
    },
  },
};

interface ChartProps {
  // options: ChartOptions<'line'>;
  data: number[];
  currentRound: number;
}
const defaultLabels = Array.from({ length: 10 }, (_, i) => i + 1);
const defaultData = {
  labels: defaultLabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [],
      borderColor: 'red',
      backgroundColor: 'red',
    },
  ],
};

const Chart = ({ data, currentRound }: ChartProps) => {
  const [chartData, setChartData] = useState<ChartData<'line'>>(defaultData);

  useEffect(() => {
    setChartData({
      labels: defaultLabels,
      datasets: [
        {
          label: `Round ${currentRound}`,
          data: data,
          borderColor: 'red',
          backgroundColor: 'red',
        },
      ],
    });
  }, [data]);
  return (
    <div className="flex justify-center" style={{ maxHeight: '500px' }}>
      <Line
        options={options}
        data={chartData}
        className="bg-zinc-900 rounded-2xl shadow-md ring-1 ring-gray-700 p-2"
      ></Line>
    </div>
  );
};

export default Chart;

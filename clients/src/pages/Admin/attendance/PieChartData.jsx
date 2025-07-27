import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartData = ({ absent, present }) => {
  const chartData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [present, absent],
        backgroundColor: ["#4ade80", "#f87171"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      {chartData ? (
        <div className="w-full mt-5 mx-auto p-4 bg-white rounded shadow">
          <Pie width={300} height={300} data={chartData} />
        </div>
      ) : (
        <p className="text-gray-500">Loading attendance...</p>
      )}
    </div>
  );
};

export default PieChartData;

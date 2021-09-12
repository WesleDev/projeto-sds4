import axios from 'axios';
import Chart from 'react-apexcharts';
import { BASE_URL } from 'utils/requests';
import { SaleSum } from 'types/sale';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react';

type ChartData = {
  labels: string[];
  series: number[];
};

const DonutChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    series: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get(`${BASE_URL}/sales/amount-by-seller`).then((response) => {
        const data = response.data as SaleSum[];
        const myLabels = data.map((x) => x.sellerName);
        const mySeries = data.map((x) => x.sum);

        setChartData({ labels: myLabels, series: mySeries });
      });
      setLoading(false);
    });
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     axios.get(`${BASE_URL}/sales/amount-by-seller`).then((response) => {
  //       setChartData(response.data);
  //     });

  //     setLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  const options = {
    legend: {
      show: true,
    },
  };
  return (
    <div>
      {loading && (
        <Skeleton
          style={{ marginLeft: 200 }}
          circle={true}
          height={200}
          width={200}
        />
      )}
      {!loading && (
        <Chart
          options={{ ...options, labels: chartData.labels }}
          series={chartData.series}
          type='donut'
          height='240'
        />
      )}
    </div>
  );
};

export default DonutChart;

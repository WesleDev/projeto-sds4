import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { BASE_URL } from 'utils/requests';
import { round } from 'utils/format';
import Skeleton from 'react-loading-skeleton';

type SeriesData = {
  name: string;
  data: number[];
};

type ChartData = {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
};

const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: [],
    },
    series: [
      {
        name: '',
        data: [],
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get(`${BASE_URL}/sales/success-by-seller`).then((response) => {
        const data = response.data as SaleSuccess[];
        const myLabels = data.map((x) => x.sellerName);
        const mySeries = data.map((x) =>
          round((100.0 * x.deals) / x.visited, 1)
        );

        setChartData({
          labels: {
            categories: myLabels,
          },
          series: [
            {
              name: '% Success',
              data: mySeries,
            },
          ],
        });
      });
      setLoading(false);
    });
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     axios.get('data').then((response) => {
  //       setChartData(response.data);
  //     });

  //     setLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  return (
    <div>
      {loading && <Skeleton count={5} height={33} />}
      {!loading && (
        <>
          <Chart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type='bar'
            height='240'
          />
        </>
      )}
    </div>
  );
};

export default BarChart;

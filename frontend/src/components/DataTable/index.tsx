import axios from 'axios';
import { useEffect, useState } from 'react';
import { SalePage } from 'types/sale';
import { formatLocalDate } from 'utils/format';
import { BASE_URL } from 'utils/requests';
import Skeleton from 'react-loading-skeleton';
import Pagination from 'components/Pagination';

const DataTable = () => {
  const [activePage, setActivePage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<SalePage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/sales?page=${activePage}&size=20&sort=date,desc`)
      .then((response) => {
        setPage(response.data);
      });
  }, [activePage]);

  const changePage = (index: number) => {
    setActivePage(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get('data').then((response) => {
        setActivePage(response.data);
      });

      setLoading(false);
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Skeleton count={20} height={18} />
      ) : (
        <>
          <Pagination page={page} onPageChange={changePage} />
          <div className='table-responsive'>
            <table className='table table-striped table-sm'>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Vendedor</th>
                  <th>Clientes visitados</th>
                  <th>Negócios fechados</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {page.content?.map((item) => (
                  <tr key={item.id}>
                    <td>{formatLocalDate(item.date, 'dd/MM/yyyy')}</td>
                    <td>{item.seller.name}</td>
                    <td>{item.visited}</td>
                    <td>{item.deals}</td>
                    <td>{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;

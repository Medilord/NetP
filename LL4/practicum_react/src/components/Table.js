import { useEffect, useMemo, useState } from 'react';
import Filter from './Filter';
import TableBody from './TableBody';
import TableHead from './TableHead';

function getPaginationState(value) {
  return !(value === false || value === '0' || value === 0);
}

function Table({ data, amountRows = 10, numPage = 1, isPaginated = true }) {
  const rowsPerPage = Number(amountRows);
  const paginationEnabled = getPaginationState(isPaginated);

  const [filteredData, setFilteredData] = useState(data);
  const [activePage, setActivePage] = useState(Number(numPage));

  const columns = useMemo(() => Object.keys(data[0] || {}), [data]);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));

  useEffect(() => {
    if (!paginationEnabled) {
      setActivePage(1);
      return;
    }

    if (activePage > totalPages) {
      setActivePage(totalPages);
    }
  }, [activePage, paginationEnabled, totalPages]);

  const visibleData = useMemo(() => {
    if (!paginationEnabled) {
      return filteredData;
    }

    const firstIndex = (activePage - 1) * rowsPerPage;
    const lastIndex = firstIndex + rowsPerPage;

    return filteredData.slice(firstIndex, lastIndex);
  }, [activePage, filteredData, paginationEnabled, rowsPerPage]);

  const filterData = (newData) => {
    setFilteredData(newData);
    setActivePage(1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="table-wrapper">
      <Filter fullData={data} onFilter={filterData} />

      <table>
        <TableHead columns={columns} />
        <TableBody rows={visibleData} columns={columns} />
      </table>

      {paginationEnabled && filteredData.length > 0 && (
        <div className="pagination" aria-label="Пагинация таблицы">
          {pageNumbers.map((page) => (
            <span
              key={page}
              className={page === activePage ? 'page-number page-number-active' : 'page-number'}
              onClick={() => setActivePage(page)}
            >
              {page}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Table;

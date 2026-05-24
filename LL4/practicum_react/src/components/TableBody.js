import TableRow from './TableRow';

function TableBody({ rows, columns }) {
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td className="empty-row" colSpan={columns.length}>
            Нет данных, подходящих под заданные фильтры
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((item, index) => (
        <tr key={`${item['Название']}-${index}`}>
          <TableRow row={columns.map((column) => item[column])} />
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;

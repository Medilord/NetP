function TableRow({ row, isHead = false }) {
  const Cell = isHead ? 'th' : 'td';

  return row.map((value, index) => (
    <Cell key={`${value}-${index}`}>{value}</Cell>
  ));
}

export default TableRow;

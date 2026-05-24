import TableRow from './TableRow';

function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        <TableRow row={columns} isHead={true} />
      </tr>
    </thead>
  );
}

export default TableHead;

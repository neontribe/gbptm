import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import ResultRow from './Row';

function Results(props) {
  const {
    data,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Area</TableCell>
          <TableCell>Contributors</TableCell>
          <TableCell>Date Updated</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.loos.map((loo) => (
          <ResultRow loo={loo} key={loo.id} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={data.total}
            rowsPerPage={rowsPerPage}
            page={data.page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default Results;

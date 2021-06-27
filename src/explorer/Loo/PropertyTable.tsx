import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function PropertyTable({ items }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Property</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(items).map((item) => {
          return (
            <TableRow key={item[0]}>
              <TableCell component="th" scope="row">
                {item[0]}
              </TableCell>
              <TableCell>
                <div>
                  <pre>{JSON.stringify(item[1], null, 2)}</pre>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

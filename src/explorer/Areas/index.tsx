import React from 'react';
import useSWR from 'swr';
import { Link } from 'next/link';
import get from 'lodash/get';
import { loader } from 'graphql.macro';
import { print } from 'graphql/language/printer';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const AREA_STATS = print(loader('./areaStats.graphql'));

const cells = [
  {
    key: 'meta.name',
    name: 'Area Name',
  },
  {
    key: 'totalLoos',
    name: 'Loos',
  },
  {
    key: 'activeLoos',
    name: 'Active Loos',
  },
  {
    key: 'babyChangeLoos',
    name: 'Baby Changing',
  },
];

function Areas() {
  const { isValidating: loading, error, data } = useSWR(AREA_STATS);

  return (
    <div>
      <Table height={'600px'}>
        <TableHead>
          <TableRow>
            {cells.map((val) => {
              return <TableCell key={'h_' + val.key}>{val.name}</TableCell>;
            })}
            <TableCell key={'h_listLink'} />
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ||
            (!data && (
              <TableRow>
                <TableCell>
                  <h5>Loading area stats...</h5>
                </TableCell>
              </TableRow>
            ))}

          {error && (
            <TableRow>
              <TableCell>
                <h5>Error fetching area stats: {error}</h5>
              </TableCell>
            </TableRow>
          )}

          {!error &&
            !loading &&
            data &&
            data.areaStats.map((area, index) => (
              <TableRow key={index}>
                {cells.map((cell) => (
                  <TableCell key={cell.key + 'c_' + index}>
                    {get(area, cell.key)}
                  </TableCell>
                ))}

                <TableCell key={`link_${area.meta.name}`}>
                  <Link to={`./search?areaName=${area.meta.name}`}>
                    view loos
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Areas;

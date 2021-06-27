import React from 'react';
import uniq from 'lodash/uniq';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'next/link';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import PeopleIcon from '@material-ui/icons/People';
import NameIcon from '@material-ui/icons/TextFields';
import CityIcon from '@material-ui/icons/LocationCity';
import ClockIcon from '@material-ui/icons/AccessTime';

import TimeAgo from 'timeago-react';

const MISSING_MESSAGE = 'Not Recorded';

export default function ResultRow({ loo }) {
  const { name, area } = loo;
  const contributors = loo.reports.reduce((current, next) => {
    current.push(next.contributor);
    return current;
  }, []);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Link to={`./loos/${loo.id}`}>
          <Chip
            avatar={
              <Avatar>
                <NameIcon />
              </Avatar>
            }
            label={name || MISSING_MESSAGE}
            color={name ? 'primary' : 'secondary'}
            variant="default"
            clickable
          />
        </Link>
      </TableCell>
      <TableCell>
        {area
          ? area.map((val) => {
              return (
                <React.Fragment key={val.name}>
                  <Chip
                    avatar={
                      <Avatar>
                        <CityIcon />
                      </Avatar>
                    }
                    label={val.name}
                    color={val.name ? 'primary' : 'secondary'}
                    variant="default"
                  />
                  <Chip
                    label={val.type}
                    color={val.type ? 'primary' : 'secondary'}
                    variant="outlined"
                  />
                </React.Fragment>
              );
            })
          : null}
      </TableCell>

      <TableCell>
        {uniq(contributors).map((attr, i) => {
          return (
            <Chip
              key={attr + i}
              avatar={
                <Avatar>
                  <PeopleIcon />
                </Avatar>
              }
              label={attr || MISSING_MESSAGE}
              color={attr ? 'primary' : 'secondary'}
              variant="default"
            />
          );
        })}
      </TableCell>

      <TableCell>
        <Chip
          avatar={
            <Avatar>
              <ClockIcon />
            </Avatar>
          }
          label={<TimeAgo datetime={loo.updatedAt} /> || MISSING_MESSAGE}
          color={loo.updatedAt ? 'primary' : 'secondary'}
          variant="default"
        />
      </TableCell>
    </TableRow>
  );
}

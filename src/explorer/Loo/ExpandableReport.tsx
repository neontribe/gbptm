import React, { useState } from 'react';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import parseISO from 'date-fns/parseISO';
import lightFormat from 'date-fns/lightFormat';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PropertyTable from './PropertyTable';

export default function ExpandableReport(props) {
  let [expanded, setExpanded] = useState(false);
  let report = pickBy(props.report, (val) => val !== null);
  let displayProperties = omit(
    report,
    'contributor',
    'createdAt',
    '__typename'
  );
  return (
    <ExpansionPanel
      key={report.id}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Report from: {report.contributor}</Typography>
        <Typography>
          Created:{' '}
          {lightFormat(parseISO(report.createdAt), 'dd/MM/yyyy, hh:mm aa')}
        </Typography>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <PropertyTable items={displayProperties} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

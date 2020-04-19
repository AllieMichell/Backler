import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#00695c',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginRight:420,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  position: {

    marginRight:6000
  }
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Agenda HUB', 'MySQL', '170119_110832', '/path/path', 'Exitoso'),
  createData('Beta', 'MySQL', '170119_110832', '/path/path', 'Exitoso'),
  createData('Central', 'MySQL', '170119_110832', '/path/path', 'Exitoso'),
  createData('Doppler', 'MongoDB', '170119_110832', '/path/path', 'Exitoso'),
  createData('Projects', 'MySQL', '170119_110832', '/path/path', 'Error'),
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <div className={classes.position}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Nombre DB</CustomTableCell>
              <CustomTableCell align="right">Tipo</CustomTableCell>
              <CustomTableCell align="right">Hora</CustomTableCell>
              <CustomTableCell align="right">Path</CustomTableCell>
              <CustomTableCell align="right">Status</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell align="right">{row.calories}</CustomTableCell>
                <CustomTableCell align="right">{row.fat}</CustomTableCell>
                <CustomTableCell align="right">{row.carbs}</CustomTableCell>
                <CustomTableCell align="right">{row.protein}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
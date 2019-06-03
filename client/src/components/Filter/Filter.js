import React, { Component } from 'react';
import './Filter.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

class Filter extends Component {
    state = {}

    render() {

      return (
        <div className="PeopleFilterBoxContent">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><h5>Search</h5></TableCell>
                <TableCell align="right"><h6>Min</h6></TableCell>
                <TableCell align="right"><h6>Max</h6></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><h6>Distance</h6></TableCell>
                <TableCell align="right">
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><h6>Age</h6></TableCell>
                <TableCell align="right">
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><h6>Score</h6></TableCell>
                <TableCell align="right">
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><h6>Tags</h6></TableCell>
                <TableCell><h6>Tag select</h6></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );
    }
}

export default Filter;

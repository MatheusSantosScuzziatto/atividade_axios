import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { useState, useEffect } from 'react'  

const columns = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'name', label: 'Nome', minWidth: 200, align: 'left' },
  { id: 'username', label: 'Nome de Usuario', minWidth: 200, align: 'left' },
  { id: 'email', label: 'E-Mail', minWidth: 200, align: 'left' },
  { id: 'phone', label: 'Telefone', minWidth: 100, align: 'center' },
  { id: 'website', label: 'Site', minWidth: 200, align: 'left' },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {    
    const GetData = async () => {    
      const result = await axios.get('https://jsonplaceholder.typicode.com/users');
      setData(result.data);    
    }  
    GetData();    
    console.log(data);  
  }, []); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }, {fontWeight: "bold"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow >  
                  <TableCell align="center">{row.id}</TableCell>  
                  <TableCell align="left">{row.name}</TableCell>  
                  <TableCell align="left">{row.username}</TableCell>  
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>  
                  <TableCell align="left">{row.website}</TableCell>
              </TableRow> 
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

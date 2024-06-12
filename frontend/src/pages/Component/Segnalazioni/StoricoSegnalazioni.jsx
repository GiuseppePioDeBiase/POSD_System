// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

const columns = [
  { width: 40, label: 'Stato', dataKey: 'stato' },
  { width: 50, label: 'Oggetto', dataKey: 'oggetto' },
  { width: 90, label: 'Messaggio', dataKey: 'messaggio' },
  { width: 90, label: 'Data modifica', dataKey: 'data_ora_modifica' }
];

function SimpleTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                align="left"
                style={{ width: column.width }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: column.width
                  }}
                  sx={{padding: '30px'}}
                >
                  <Tooltip title={row[column.dataKey]}>
                    <span>{row[column.dataKey]}</span>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SimpleTable.propTypes = {
  rows: PropTypes.array.isRequired
};

export default function ReactVirtualizedTable({ token, ruolo }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        if (ruolo === 'Utente') {
          response = await axios.get('http://localhost:5000/api/storicoutente', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        } else {
          response = await axios.get('http://localhost:5000/api/storicociso', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        }
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleCellClick = (row) => {
    navigate(`/segnalazione/${row._id}`, { state: { messaggio: row.messaggio, oggetto: row.oggetto, token } });
  };

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  console.log('Rows:', rows); // Log the rows state to ensure it's correctly set

  return (
    <Paper>
      {rows.length > 0 ? (
        <SimpleTable rows={rows} handleCellClick={handleCellClick} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          Nessuna segnalazione
        </div>
      )}
    </Paper>
  );
}

ReactVirtualizedTable.propTypes = {
  token: PropTypes.string.isRequired,
  ruolo: PropTypes.string.isRequired
};

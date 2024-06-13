import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const columns = [
  { width: 20, label: 'Email', dataKey: 'mail' },
  { width: 50, label: 'Oggetto', dataKey: 'oggetto' },
  { width: 90, label: 'Messaggio', dataKey: 'messaggio' },
];

function SimpleTable({ rows, handleCellClick }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {rows.map((row) => (
            <TableRow key={row._id}>
              {columns.map((column) => (
                <TableCell
                  key={column.dataKey}
                  onClick={column.dataKey === 'messaggio' ? () => handleCellClick(row) : undefined}
                  style={{
                    cursor: column.dataKey === 'messaggio' ? 'pointer' : 'default',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row[column.dataKey]}
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
  rows: PropTypes.array.isRequired,
  handleCellClick: PropTypes.func.isRequired,
};

export default function ReactVirtualizedTable({ token }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allsegnalazioni', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
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
};
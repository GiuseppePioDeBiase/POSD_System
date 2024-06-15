import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import PropTypes from 'prop-types';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';


const columns = [
  {
    width: 10,
    label: 'Stato',
    dataKey: 'stato',
  },
  {
    width: 40,
    label: 'Oggetto',
    dataKey: 'oggetto',
  },
  {
    width: 90,
    label: 'Messaggio',
    dataKey: 'messaggio',
  },
  {
    width: 20,
    label: 'Data',
    dataKey: 'data_ora_modifica',
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

VirtuosoTableComponents.Scroller.displayName = 'Scroller';
VirtuosoTableComponents.Table.displayName = 'Table';
VirtuosoTableComponents.TableHead.displayName = 'TableHead';
VirtuosoTableComponents.TableRow.displayName = 'TableRow';
VirtuosoTableComponents.TableBody.displayName = 'TableBody';

VirtuosoTableComponents.TableRow.propTypes = {
  item: PropTypes.any,
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable({ token, ruolo }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleRoleCheckboxChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let endpoint;
      switch (ruolo) {
        case 'CISO':
          endpoint = 'storicociso';
          break;
        case 'Utente':
          endpoint = 'storicoutente';
          break;
        default:
          setError('Ruolo non valido');
          setLoading(false);
          return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [ruolo, token]);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  const filteredRows = rows.filter((row) => selectedRoles.length === 0 || selectedRoles.includes(row.stato));

 return (
  <Paper style={{ height: '405px', width: '100%' }}>
    {filteredRows.length > 0 ? (
      <>
        <div className="flex items-center justify-center w-full">
          <Checkbox
            checked={selectedRoles.includes('ACCETTATO')}
            onChange={() => handleRoleCheckboxChange('ACCETTATO')}
          /> ACCETTATO
          <Checkbox
            checked={selectedRoles.includes('RIFIUTATO')}
            onChange={() => handleRoleCheckboxChange('RIFIUTATO')}
          /> RIFIUTATO
        </div>
        <TableVirtuoso
          data={filteredRows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) => rowContent(index, row)}
        />
      </>
    ) : (
      <div className="flex flex-row justify-content-center font-bold text-xl">Nessun dato</div>
    )}
  </Paper>
);

}

ReactVirtualizedTable.propTypes = {
  token: PropTypes.string.isRequired,
  ruolo: PropTypes.string.isRequired,
};

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
import { TableVirtuoso } from 'react-virtuoso';
import AggiungiSegnalazione from "./AggiungiSegnalazione.jsx";


const columns = [
  {
    width: 20,
    label: 'ID CISO',
    dataKey: 'mail',
  },
  {
    width: 50,
    label: 'Oggetto',
    dataKey: 'oggetto',
  },
  {
    width: 90,
    label: 'Messaggio',
    dataKey: 'messaggio',
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

function rowContent(_index, row, handleCellClick) {
  return (
    <React.Fragment>
      {columns.map((column, colIndex) => (
        <TableCell
          onClick={colIndex === 2 ? () => handleCellClick(row) : undefined}
          style={{ cursor: 'pointer'  }}
          sx={{ '&:hover': { backgroundColor:'rgba(0, 0, 0, 0.08)'  } }}
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSegnalazioneForm, setShowSegnalazioneForm] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allsegnalazioniaccettate');
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCellClick = (row) => {
    setShowSegnalazioneForm(false); // Close the form before opening a new one
    setTimeout(() => {
      setSelectedCell(row);
      setShowSegnalazioneForm(true);
    }, 0); // Open the form with new details
  };

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  return (
    <Paper style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={(index, row) => rowContent(index, row, handleCellClick)}
      />
      {showSegnalazioneForm && selectedCell && (
       <AggiungiSegnalazione
          key={selectedCell._id}
          messaggio={selectedCell.messaggio}
          oggetto={selectedCell.oggetto}
          id={selectedCell._id}
        />
      )}
    </Paper>
  );
}

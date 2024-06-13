import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

<<<<<<< Updated upstream
function SimpleTable({ columns, rows, handleCellClick }) {
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={`${row.id}-${column.dataKey}`}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: column.width,
                    padding: '30px'
                  }}
                  onClick={column.clickable ? () => handleCellClick(row) : undefined}
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
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      dataKey: PropTypes.string.isRequired,
      clickable: PropTypes.bool // Optional: Whether the column should be clickable
    })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Ensure each row has a unique identifier
    })
  ).isRequired,
  handleCellClick: PropTypes.func // Optional: Function to handle cell clicks
=======
function SimpleTable({columns, rows, handleCellClick}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.dataKey}
                                align="left"
                                style={{width: column.width}}
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
                                        maxWidth: column.width,
                                        padding: '30px'
                                    }}
                                    onClick={column.clickable ? () => handleCellClick(row) : undefined}
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
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            width: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
            dataKey: PropTypes.string.isRequired,
            clickable: PropTypes.bool // Optional: Whether the column should be clickable
        })
    ).isRequired,
    rows: PropTypes.array.isRequired,
    handleCellClick: PropTypes.func // Optional: Function to handle cell clicks
>>>>>>> Stashed changes
};

export default SimpleTable;

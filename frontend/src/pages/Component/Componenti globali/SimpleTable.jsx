import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import React from "react";

function SimpleTable({ columns, rows, handleCellClick }) {
    return (
        <Box sx={{ overflowX: 'auto' }}>
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
        </Box>
    );
}

SimpleTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            width: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
            dataKey: PropTypes.string.isRequired,
            clickable: PropTypes.bool
        })
    ).isRequired,
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    handleCellClick: PropTypes.func
};
export default SimpleTable;
import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TableVirtuoso} from 'react-virtuoso';
import PropTypes from 'prop-types';

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
        <TableContainer component={Paper} {...props} ref={ref}/>
    )),
    Table: (props) => (
        <Table {...props} sx={{borderCollapse: 'separate', tableLayout: 'fixed'}}/>
    ),
    TableHead,
    TableRow: ({...props}) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref}/>),
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
                    style={{width: column.width}}
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
                    sx={{'&:hover': {backgroundColor: 'transparent'}}}
                    key={column.dataKey}
                    align={column.numeric ? 'right' : 'left'}
                    style={{overflow: 'hidden',
                        textOverflow: 'ellipsis'}}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

export default function ReactVirtualizedTable({token}) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/storicoutente', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Errore nella richiesta');
                }
                const data = await response.json();
                setRows(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) return <div>Caricamento...</div>;
    if (error) return <div>Errore: {error.message}</div>;

    return (
        <Paper style={{height: 400, width: '100%'}}>
            <TableVirtuoso
                data={rows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={(index, row) => rowContent(index, row)}
            />
        </Paper>
    );
}

ReactVirtualizedTable.propTypes = {
    token: PropTypes.string.isRequired,
};

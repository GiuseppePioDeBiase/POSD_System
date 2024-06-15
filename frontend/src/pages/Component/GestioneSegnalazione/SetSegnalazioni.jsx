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
import {Link} from "react-router-dom";

const columns = [
    {
        width: 40,
        label: 'Email',
        dataKey: 'mail',
    },
    {
        width: 40,
        label: 'Oggetto',
        dataKey: 'oggetto',
    },
    {
        width: 40,
        label: 'Messaggio',
        dataKey: 'messaggio',
    },
];
const columnsAS = [
    {
        width: 40,
        label: 'ID CISO',
        dataKey: 'id_ciso',
    },
    {
        width: 40,
        label: 'Oggetto',
        dataKey: 'oggetto',
    },
    {
        width: 40,
        label: 'Messaggio',
        dataKey: 'messaggio',
    },
    {
        width: 40,
        label: 'Data modifica',
        dataKey: 'data_ora_modifica',
    }
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

function fixedHeaderContent(ruolo) {
    const scelta = ruolo === 'CISO' ? columns : columnsAS;
    return (
        <TableRow>
            {scelta.map((column) => (
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

function rowContent(_index, row, ruolo) {
    const scelta = ruolo === 'CISO' ? columns : columnsAS;
    return (
        <React.Fragment>
            {scelta.map((column) => (
                <TableCell
                    sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                    key={column.dataKey}
                    align={column.numeric ? 'right' : 'left'}
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                   {column.dataKey === 'messaggio' && ruolo === 'CISO' ? (
                        <Link to={`/segnalazione/${row._id}`} state={{ messaggio: row.messaggio, id: row._id }}>
                            {row[column.dataKey]}
                        </Link>
                    ) : (
                        row[column.dataKey]
                    )}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

export default function ReactVirtualizedTable({ token, ruolo }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let endpoint;

            switch (ruolo) {
                case 'CISO':
                    endpoint = 'allsegnalazioni';
                    break;
                case 'Amministratore di sistema':
                default:
                    endpoint = 'allsegnalazioniaccettate';
                    break;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/${endpoint}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRows(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
                setLoading(false);
                setError(error);
            }
        };
        fetchData();
    }, [ruolo, token]);

    if (loading) return <div>Caricamento...</div>;
    if (error) return <div>Errore: {error.message}</div>;

    return (
        <Paper style={{ height: 400, width: '100%' }}>
            {rows.length > 0 ? (
                <TableVirtuoso
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={() => fixedHeaderContent(ruolo)}
                    itemContent={(index, row) => rowContent(index, row, ruolo)}
                />
            ) : (
                <div className="flex flex-row justify-content-center font-bold text-xl">Nessun dato</div>
            )}
        </Paper>
    );
}

ReactVirtualizedTable.propTypes = {
    token: PropTypes.string.isRequired,
    ruolo: PropTypes.string.isRequired
};

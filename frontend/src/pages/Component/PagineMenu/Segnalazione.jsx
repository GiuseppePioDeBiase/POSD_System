import { useState, useEffect } from "react";
import axios from "axios";
import { Paper, TableCell, TableRow } from "@mui/material";
import React from "react";
import { TableVirtuoso } from "react-virtuoso";

// Definizione delle colonne della tabella
const columns = [
    {
        width: 200,
        label: 'Email',
        dataKey: 'email',
    },
    {
        width: 120,
        label: 'Oggetto',
        dataKey: 'oggetto',
    },
    {
        width: 120,
        label: 'Messaggio',
        dataKey: 'messaggio',
    },
];

// Componente per il rendering del contenuto fisso dell'header della tabella
function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
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

// Componente per il rendering del contenuto delle righe della tabella
function rowContent(_index, row) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

// Componente React che gestisce la tabella virtuale
function ReactVirtualizedTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        // Effettua una chiamata API per ottenere i dati dal database
        axios.get('http://127.0.0.1:5000/api/segnalazione')
            .then(response => {
                const formattedData = response.data.map(item =>
                    ({ oggetto: item.oggetto, messaggio: item.messaggio, email: item.email })
                );
                setRows(formattedData);
            })
            .catch(error => {
                console.error('Errore nel recupero dei dati:', error);
            });
    }, []);

    // Restituisci il componente TableVirtuoso con i dati rows come prop data
    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <TableVirtuoso
                data={rows}
                components={{
                    Scroller: Paper,
                    TableBody: React.Fragment,
                    TableCell,
                    TableRow
                }}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    );
}

// Componente principale che renderizza la tabella virtuale
function Segnalazione() {
    return (
        <ReactVirtualizedTable />
    );
}

export default Segnalazione;

import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import SimpleTable from "../../Componenti globali/SimpleTable.jsx";

export default function ReactVirtualizedTable({token, ruolo}) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/allsegnalazioniaccettate`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRows(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token, ruolo]);

    const columns = [
        {width: 40, label: 'ID CISO', dataKey: 'id_ciso', clickable: false},
        {width: 50, label: 'Oggetto', dataKey: 'oggetto', clickable: false},
        {width: 90, label: 'Messaggio', dataKey: 'messaggio', clickable: false},
        {width: 90, label: 'Data modifica', dataKey: 'data_ora_modifica', clickable: false}
    ];

    if (loading) return <div>Caricamento...</div>;
    if (error) return <div>Errore: {error.message}</div>;

    return (
        <Paper style={{maxHeight: '500px', overflow: 'auto'}}>
            {rows.length > 0 ? (
                <SimpleTable columns={columns} rows={rows}/>
            ) : (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
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
